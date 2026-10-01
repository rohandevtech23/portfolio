import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import {
  MdAutoAwesome,
  MdBarChart,
  MdStorage,
  MdCode,
} from "react-icons/md";
import "./styles/TechStack.css";

// Generator for glossy white skill spheres with centered dual-hemisphere logos
function createWhiteSkillTexture(
  name: string,
  color: string,
  subtext?: string,
  iconShape: "bars" | "snakes" | "db" | "pandas" | "chain" | "bolt" = "bars"
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1500;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  // Pure white sphere base matching template webp style
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const drawSymbol = (cx: number, cy: number) => {
    ctx.save();
    const iconY = cy - 70;

    if (iconShape === "bars") {
      // Power BI style 3 vertical bars
      const barColors = ["#f2c811", "#e0b000", "#cfa000"];
      const heights = [70, 110, 150];
      const barW = 28;
      const spacing = 14;
      const startX = cx - (3 * barW + 2 * spacing) / 2;
      heights.forEach((h, idx) => {
        ctx.fillStyle = barColors[idx];
        ctx.beginPath();
        ctx.roundRect(startX + idx * (barW + spacing), iconY + 70 - h, barW, h, 6);
        ctx.fill();
      });
    } else if (iconShape === "db") {
      // SQL database cylinders
      ctx.strokeStyle = color;
      ctx.lineWidth = 14;
      ctx.fillStyle = "#edf9fc";
      [-40, 0, 40].forEach((offsetY) => {
        ctx.beginPath();
        ctx.ellipse(cx, iconY + offsetY, 70, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    } else if (iconShape === "snakes") {
      // Python style dual-color badge
      ctx.fillStyle = "#3776ab";
      ctx.beginPath();
      ctx.arc(cx - 24, iconY - 14, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffd438";
      ctx.beginPath();
      ctx.arc(cx + 24, iconY + 14, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx - 24, iconY - 24, 8, 0, Math.PI * 2);
      ctx.arc(cx + 24, iconY + 24, 8, 0, Math.PI * 2);
      ctx.fill();
    } else if (iconShape === "bolt") {
      // FastAPI lightning bolt
      ctx.fillStyle = "#009688";
      ctx.beginPath();
      ctx.moveTo(cx + 10, iconY - 70);
      ctx.lineTo(cx - 45, iconY + 10);
      ctx.lineTo(cx - 5, iconY + 10);
      ctx.lineTo(cx - 25, iconY + 75);
      ctx.lineTo(cx + 45, iconY - 5);
      ctx.lineTo(cx + 5, iconY - 5);
      ctx.closePath();
      ctx.fill();
    } else if (iconShape === "chain") {
      // LangChain linked chain
      ctx.strokeStyle = "#00a67e";
      ctx.lineWidth = 18;
      ctx.beginPath();
      ctx.arc(cx - 30, iconY, 45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx + 30, iconY, 45, 0, Math.PI * 2);
      ctx.stroke();
    } else if (iconShape === "pandas") {
      // Pandas multi-color blocks
      ctx.fillStyle = "#150458";
      ctx.beginPath();
      ctx.roundRect(cx - 60, iconY - 50, 48, 48, 10);
      ctx.fill();
      ctx.fillStyle = "#e70488";
      ctx.beginPath();
      ctx.roundRect(cx + 10, iconY - 50, 48, 48, 10);
      ctx.fill();
      ctx.fillStyle = "#00b0ff";
      ctx.beginPath();
      ctx.roundRect(cx - 25, iconY + 10, 48, 48, 10);
      ctx.fill();
    }

    // Bold Skill Name
    ctx.fillStyle = color;
    ctx.font = "bold 80px Geist, Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, cx, cy + 90);

    if (subtext) {
      ctx.fillStyle = "#666666";
      ctx.font = "600 34px Geist, Inter, sans-serif";
      ctx.fillText(subtext, cx, cy + 155);
    }

    ctx.restore();
  };

  // 25% front hemisphere and 75% back hemisphere
  drawSymbol(375, 480);
  drawSymbol(1125, 480);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

const textureLoader = new THREE.TextureLoader();

const sphereGeometry = new THREE.SphereGeometry(1, 24, 24);

const spheres = [...Array(22)].map(() => ({
  scale: [0.75, 0.85, 0.95, 1, 0.9][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshStandardMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.05, delta);
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -45 * delta * scale,
          -120 * delta * scale,
          -45 * delta * scale
        )
      );

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.8}
      angularDamping={0.2}
      friction={0.25}
      position={[r(16), r(16) - 20, r(16) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.15 * scale]}
        args={[0.15 * scale, 0.25 * scale]}
      />
      <mesh
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const materials = useMemo(() => {
    const dataScienceSkills = [
      createWhiteSkillTexture("Python", "#306998", "Data Science", "snakes"),
      createWhiteSkillTexture("SQL", "#00758f", "Relational DB", "db"),
      createWhiteSkillTexture("Power BI", "#202020", "Dashboards", "bars"),
      createWhiteSkillTexture("Pandas", "#150458", "Analytics", "pandas"),
      createWhiteSkillTexture("LangChain", "#006b52", "GenAI / RAG", "chain"),
      createWhiteSkillTexture("FastAPI", "#009688", "APIs", "bolt"),
    ];

    const imageTextures = [
      "/images/mysql.webp",
      "/images/react2.webp",
      "/images/next2.webp",
      "/images/typescript.webp",
      "/images/node2.webp",
      "/images/mongo.webp",
      "/images/javascript.webp",
    ].map((url) => textureLoader.load(url));

    const allTextures = [...dataScienceSkills, ...imageTextures];

    return allTextures.map(
      (tex) =>
        new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.2,
          metalness: 0.05,
        })
    );
  }, []);

  return (
    <section className="techstack-section section-container" id="skills">
      <div className="techstack-container" ref={containerRef}>
        <h2>
          Technical <span>Skills</span>
        </h2>
        <p className="techstack-subtitle">
          Interactive physics simulation featuring core skills in Machine
          Learning, Data Science, and Engineering. Drag or bump the spheres!
        </p>

        <div className="tech-canvas-container">
          <Canvas
            dpr={1}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            className="tech-canvas"
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 15, 10]} intensity={2.5} />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#aa42ff" />
            <Physics gravity={[0, 0, 0]}>
              <Pointer isActive={isActive} />
              {spheres.map((props, i) => (
                <SphereGeo
                  key={i}
                  {...props}
                  material={materials[i % materials.length]}
                  isActive={isActive}
                />
              ))}
            </Physics>
          </Canvas>
          <div className="tech-hint">Interactive 3D Physics • Bump with Cursor</div>
        </div>

        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-card-header">
              <div className="tech-card-icon"><MdAutoAwesome /></div>
              <span className="tech-card-level">Advanced</span>
            </div>
            <h3>Machine Learning & AI</h3>
            <p>RAG pipelines, vector embeddings, LLM orchestration, and semantic search systems.</p>
            <div className="tech-tags-list">
              <span className="tech-tag-chip">Python</span>
              <span className="tech-tag-chip">LangChain</span>
              <span className="tech-tag-chip">RAG</span>
              <span className="tech-tag-chip">ChromaDB</span>
              <span className="tech-tag-chip">LLMs</span>
              <span className="tech-tag-chip">OpenAI API</span>
              <span className="tech-tag-chip">Whisper API</span>
            </div>
          </div>

          <div className="tech-card">
            <div className="tech-card-header">
              <div className="tech-card-icon"><MdBarChart /></div>
              <span className="tech-card-level">3+ Years Exp</span>
            </div>
            <h3>Data Analysis & BI</h3>
            <p>Exploratory Data Analysis (EDA), statistical modeling, and executive Power BI dashboards.</p>
            <div className="tech-tags-list">
              <span className="tech-tag-chip">Power BI</span>
              <span className="tech-tag-chip">DAX</span>
              <span className="tech-tag-chip">Pandas</span>
              <span className="tech-tag-chip">NumPy</span>
              <span className="tech-tag-chip">Matplotlib</span>
              <span className="tech-tag-chip">Seaborn</span>
              <span className="tech-tag-chip">Microsoft Excel</span>
            </div>
          </div>

          <div className="tech-card">
            <div className="tech-card-header">
              <div className="tech-card-icon"><MdStorage /></div>
              <span className="tech-card-level">Production</span>
            </div>
            <h3>Databases & Architecture</h3>
            <p>Relational schema design, query optimization, indexing, and high-throughput pipelines.</p>
            <div className="tech-tags-list">
              <span className="tech-tag-chip">SQL</span>
              <span className="tech-tag-chip">PostgreSQL</span>
              <span className="tech-tag-chip">MySQL</span>
              <span className="tech-tag-chip">MongoDB</span>
              <span className="tech-tag-chip">DBMS</span>
              <span className="tech-tag-chip">Query Optimization</span>
            </div>
          </div>

          <div className="tech-card">
            <div className="tech-card-header">
              <div className="tech-card-icon"><MdCode /></div>
              <span className="tech-card-level">Enterprise</span>
            </div>
            <h3>Backend & Engineering</h3>
            <p>High-performance RESTful APIs, asynchronous services, and full-stack web integration.</p>
            <div className="tech-tags-list">
              <span className="tech-tag-chip">FastAPI</span>
              <span className="tech-tag-chip">Node.js</span>
              <span className="tech-tag-chip">Next.js</span>
              <span className="tech-tag-chip">React 19</span>
              <span className="tech-tag-chip">Laravel</span>
              <span className="tech-tag-chip">PHP</span>
              <span className="tech-tag-chip">TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
