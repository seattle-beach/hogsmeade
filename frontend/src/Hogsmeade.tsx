import React, { useEffect, useState } from "react";
import styles from "./Hogsmeade.module.css";

const Hogsmeade: React.FC = () => {
  const [dot, setDot] = useState(`
    digraph G {

      subgraph cluster_0 {
        style=filled;
        color=lightgrey;
        node [style=filled,color=white];
        a0 -> a1 -> a2 -> a3;
        label = "process #1";
      }

      subgraph cluster_1 {
        node [style=filled];
        b0 -> b1 -> b2 -> b3;
        label = "process #2";
        color=blue
      }
      start -> a0;
      start -> b0;
      a1 -> b3;
      b2 -> a3;
      a3 -> a0;
      a3 -> end;
      b3 -> end;

      start [shape=Mdiamond];
      end [shape=Msquare];
    }
  `);
  const [graph, setGraph] = useState<Buffer | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(
        "/",
        {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: dot
        }
      );
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      setGraph(buffer);
    };

    fetchImage();
  }, [dot]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.editor}>
        <Input dot={dot ?? ""} onSubmit={setDot} />
      </div>
      <div className={styles.graph}>
        <Output graph={graph}/>
      </div>
    </div>
  );
};

const Input: React.FC<{dot: string, onSubmit: any}> = ({dot, onSubmit}) => {
  const [text, setText] = useState(dot);

  return (
    <React.Fragment>
      <textarea value={text} rows={5} cols={33} onChange={(e) => setText(e.target.value)} />
      <input type="submit" value="Submit" onClick={() => onSubmit(text)} />
    </React.Fragment>
  );
};

const Output: React.FC<{graph: Buffer | null}> = ({graph}) => {
  if (graph === null) { return null; }

  const src = `data:image/png;base64, ${graph.toString("base64")}`;
  return (
    <div><img src={src} alt="graph" /></div>
  );
};

export default Hogsmeade;
