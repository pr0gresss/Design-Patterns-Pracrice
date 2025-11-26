# Design Patterns Practice — Variant: Oval & Sphere

## 📁 Project Structure
```
src/
 ├─ entities/
 ├─ factories/
 ├─ validators/
 ├─ services/
 ├─ errors/
 ├─ utilities/
 └─ index.ts
```

---


## 🧮 Implemented Functionality
### Oval
- Calculates **area** and **perimeter**  
- Determines if the shape is an **oval or circle**  
- Checks if it **intersects only one coordinate axis**

### Sphere
- Calculates **surface area** and **volume**  
- Determines if the object is a **sphere**  
- Calculates **volume ratio** by coordinate axis intersection  
- Checks if the sphere **touches any coordinate axis**

---

## 🧪 Testing
Run unit tests and generate coverage:
```bash
npm run test
```

---

## 🧰 Development
Run the application and analyze data from input files:
```bash
npm run dev
```

Lint the project:
```bash
npm run lint
# or auto-fix issues:
npm run lint:fix
```

---

## 🗂 Input Data
Figures are loaded from:
- `./data/sample_ovals.txt`
- `./data/sample_spheres.txt`  
Each line contains numeric parameters; invalid lines are skipped and logged.

---

## ✏ Input format
#### Sphere: 
```bash
centerX centerY centerZ radius
```

#### Oval:
```bash
upperLeftCornerX upperLeftCornerY bottomRightCornerX bottomRightCornerY
```
---