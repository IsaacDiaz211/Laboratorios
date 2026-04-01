import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { spawn } from "child_process";
import { PNG } from "pngjs";

type Point = {
  x: number;
  y: number;
};

type PlotOptions = {
  xLower: number;
  xUpper: number;
  width?: number;
  height?: number;
  samples?: number;
  title?: string;
  filePrefix?: string;
};

export type PlotResult = {
  filePath: string;
  ascii: string;
  xLower: number;
  xUpper: number;
  yLower: number;
  yUpper: number;
  points: Point[];
};

type Bounds = {
  xLower: number;
  xUpper: number;
  yLower: number;
  yUpper: number;
};

function setPixel(
  png: PNG,
  x: number,
  y: number,
  r: number,
  g: number,
  b: number,
  a = 255
): void {
  if (x < 0 || y < 0 || x >= png.width || y >= png.height) {
    return;
  }

  const idx = (png.width * y + x) << 2;
  png.data[idx] = r;
  png.data[idx + 1] = g;
  png.data[idx + 2] = b;
  png.data[idx + 3] = a;
}

function drawLine(
  png: PNG,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  r: number,
  g: number,
  b: number
): void {
  let currentX = Math.round(x0);
  let currentY = Math.round(y0);
  const targetX = Math.round(x1);
  const targetY = Math.round(y1);

  const dx = Math.abs(targetX - currentX);
  const sx = currentX < targetX ? 1 : -1;
  const dy = -Math.abs(targetY - currentY);
  const sy = currentY < targetY ? 1 : -1;
  let error = dx + dy;

  while (true) {
    setPixel(png, currentX, currentY, r, g, b);
    if (currentX === targetX && currentY === targetY) {
      break;
    }

    const doubled = 2 * error;
    if (doubled >= dy) {
      error += dy;
      currentX += sx;
    }
    if (doubled <= dx) {
      error += dx;
      currentY += sy;
    }
  }
}

function mapX(x: number, bounds: Bounds, width: number, margin: number): number {
  const usableWidth = width - margin * 2;
  return margin + ((x - bounds.xLower) / (bounds.xUpper - bounds.xLower)) * usableWidth;
}

function mapY(y: number, bounds: Bounds, height: number, margin: number): number {
  const usableHeight = height - margin * 2;
  return height - margin - ((y - bounds.yLower) / (bounds.yUpper - bounds.yLower)) * usableHeight;
}

function buildBounds(points: Point[], xLower: number, xUpper: number): Bounds {
  const finitePoints = points.filter((point) => Number.isFinite(point.y));
  if (finitePoints.length === 0) {
    throw new Error("No se pudieron obtener puntos validos para el grafico.");
  }

  let yLower = finitePoints[0].y;
  let yUpper = finitePoints[0].y;
  for (const point of finitePoints) {
    yLower = Math.min(yLower, point.y);
    yUpper = Math.max(yUpper, point.y);
  }

  if (yLower === yUpper) {
    yLower -= 1;
    yUpper += 1;
  } else {
    const padding = (yUpper - yLower) * 0.1;
    yLower -= padding;
    yUpper += padding;
  }

  return { xLower, xUpper, yLower, yUpper };
}

function sampleFunction(
  fn: (x: number) => number,
  xLower: number,
  xUpper: number,
  samples: number
): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < samples; i += 1) {
    const ratio = samples === 1 ? 0 : i / (samples - 1);
    const x = xLower + ratio * (xUpper - xLower);
    const y = fn(x);
    points.push({ x, y });
  }
  return points;
}

function renderAscii(bounds: Bounds, points: Point[]): string {
  const width = 65;
  const height = 21;
  const grid = Array.from({ length: height }, () => Array.from({ length: width }, () => " "));

  const xAxisRow = bounds.yLower <= 0 && bounds.yUpper >= 0
    ? Math.round(mapY(0, bounds, height, 0))
    : -1;
  const yAxisCol = bounds.xLower <= 0 && bounds.xUpper >= 0
    ? Math.round(mapX(0, bounds, width, 0))
    : -1;

  for (let row = 0; row < height; row += 1) {
    if (yAxisCol >= 0 && yAxisCol < width) {
      grid[row][yAxisCol] = "|";
    }
  }
  if (xAxisRow >= 0 && xAxisRow < height) {
    for (let col = 0; col < width; col += 1) {
      grid[xAxisRow][col] = "-";
    }
  }
  if (xAxisRow >= 0 && xAxisRow < height && yAxisCol >= 0 && yAxisCol < width) {
    grid[xAxisRow][yAxisCol] = "+";
  }

  for (const point of points) {
    if (!Number.isFinite(point.y)) {
      continue;
    }
    const col = Math.round(mapX(point.x, bounds, width, 0));
    const row = Math.round(mapY(point.y, bounds, height, 0));
    if (row >= 0 && row < height && col >= 0 && col < width) {
      grid[row][col] = "*";
    }
  }

  return grid.map((row) => row.join("")).join("\n");
}

function drawGridAndAxes(png: PNG, bounds: Bounds, width: number, height: number, margin: number): void {
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      setPixel(png, x, y, 255, 255, 255);
    }
  }

  for (let i = 0; i <= 10; i += 1) {
    const x = Math.round(margin + (i / 10) * (width - 2 * margin));
    const y = Math.round(margin + (i / 10) * (height - 2 * margin));

    drawLine(png, x, margin, x, height - margin, 230, 230, 230);
    drawLine(png, margin, y, width - margin, y, 230, 230, 230);
  }

  drawLine(png, margin, margin, width - margin, margin, 40, 40, 40);
  drawLine(png, margin, height - margin, width - margin, height - margin, 40, 40, 40);
  drawLine(png, margin, margin, margin, height - margin, 40, 40, 40);
  drawLine(png, width - margin, margin, width - margin, height - margin, 40, 40, 40);

  if (bounds.yLower <= 0 && bounds.yUpper >= 0) {
    const axisY = Math.round(mapY(0, bounds, height, margin));
    drawLine(png, margin, axisY, width - margin, axisY, 0, 0, 0);
  }
  if (bounds.xLower <= 0 && bounds.xUpper >= 0) {
    const axisX = Math.round(mapX(0, bounds, width, margin));
    drawLine(png, axisX, margin, axisX, height - margin, 0, 0, 0);
  }
}

function defaultPlotPath(prefix: string): string {
  const timestamp = new Date().toISOString().replace(/[.:]/g, "-");
  return path.resolve(process.cwd(), "outputs", "plots", `${prefix}-${timestamp}.png`);
}

export async function openFile(filePath: string): Promise<void> {
  const platform = process.platform;
  const command =
    platform === "win32"
      ? { cmd: "cmd", args: ["/c", "start", "", filePath] }
      : platform === "darwin"
        ? { cmd: "open", args: [filePath] }
        : { cmd: "xdg-open", args: [filePath] };

  const child = spawn(command.cmd, command.args, {
    detached: true,
    stdio: "ignore",
  });
  child.unref();
}

export async function generateFunctionPlot(
  fn: (x: number) => number,
  options: PlotOptions
): Promise<PlotResult> {
  const width = options.width ?? 960;
  const height = options.height ?? 640;
  const samples = options.samples ?? 1000;
  const margin = 48;

  if (options.xUpper <= options.xLower) {
    throw new Error("x_upper debe ser mayor que x_lower.");
  }
  if (samples < 2) {
    throw new Error("La cantidad de muestras debe ser al menos 2.");
  }

  const points = sampleFunction(fn, options.xLower, options.xUpper, samples);
  const bounds = buildBounds(points, options.xLower, options.xUpper);
  const ascii = renderAscii(bounds, points.filter((_, index) => index % Math.ceil(samples / 200) === 0));
  const png = new PNG({ width, height });
  drawGridAndAxes(png, bounds, width, height, margin);

  let previous: Point | null = null;
  for (const point of points) {
    if (!Number.isFinite(point.y)) {
      previous = null;
      continue;
    }

    if (previous !== null && Number.isFinite(previous.y)) {
      drawLine(
        png,
        mapX(previous.x, bounds, width, margin),
        mapY(previous.y, bounds, height, margin),
        mapX(point.x, bounds, width, margin),
        mapY(point.y, bounds, height, margin),
        220,
        20,
        60
      );
    }
    previous = point;
  }

  const filePath = defaultPlotPath(options.filePrefix ?? "lab3-grafico");
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, PNG.sync.write(png));

  return {
    filePath,
    ascii,
    xLower: bounds.xLower,
    xUpper: bounds.xUpper,
    yLower: bounds.yLower,
    yUpper: bounds.yUpper,
    points,
  };
}
