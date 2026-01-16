import { Circle } from "./entities/Circle";
import { Rectangle } from "./entities/Rectangle";
import { PrinterRenderer } from "./renderers/PrinterRenderer";
import { ScreenRenderer } from "./renderers/ScreenRenderer";
import { AreaVisitor } from "./visitors/AreaVisitor";
import { PerimeterVisitor } from "./visitors/PerimeterVisitor";

const screen = new ScreenRenderer();
const printer = new PrinterRenderer();

const circle = new Circle(screen, 0, 0, 14);
const rectangle = new Rectangle(printer, 5, 5, 10, 7);

console.log("Rendering shapes on different devices: ");
circle.draw();
rectangle.draw();

const areaVisitor = new AreaVisitor();
const perimeterVisitor = new PerimeterVisitor();

console.log("\nUsing visitor to get shapes areas: ");
circle.accept(areaVisitor);
rectangle.accept(areaVisitor);

console.log("\nUsing visitor to get shapes perimeters: ");
circle.accept(perimeterVisitor);
rectangle.accept(perimeterVisitor);
