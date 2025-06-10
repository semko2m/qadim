import React, { useEffect, useRef, useState } from 'react';

const tableauUrl = 'https://public.tableau.com/shared/XTCDMZ8KF?:display_count=y&:origin=viz_share_link';

export const TableAuComponent = () => {
  const containerRef = useRef(null);
  const vizRef = useRef(null);
  const [isFixedSize, setIsFixedSize] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showViz, setShowViz] = useState(false);

  useEffect(() => {
    setShowViz(true);
  }, []);

  useEffect(() => {
    if (!showViz) return;

    const vizElem = document.getElementById('tableauViz');
    if (!vizElem) return;

    const evtType = window.tableau?.TableauEventType?.FirstInteractive || 'firstinteractive';

    const onFirstInteractive = async () => {
      try {
        const workbook = vizElem.workbook;
        const viz = vizElem.viz || vizElem;
        vizRef.current = viz;

        const sheet = workbook?.getActiveSheet?.();
        const sizeInfo = sheet?.getSheetSizeInfo?.();

        if (sizeInfo?.behavior === 'automatic') {
          setIsFixedSize(false);
          vizElem.style.width = '100%';
          vizElem.style.height = '100%';
        } else {
          setIsFixedSize(true);
          // Use sizeInfo's width and height directly
          // const { width, height } = sizeInfo;
          // vizElem.style.width = `${width}px`;
          // vizElem.style.height = `${height}px`;
        }

        setLoading(false);
      } catch (err) {
        console.error('Error during dashboard load:', err);
      }
    };

    vizElem.addEventListener(evtType, onFirstInteractive);
    return () => vizElem.removeEventListener(evtType, onFirstInteractive);
  }, [showViz]);

  useEffect(() => {
    if (!containerRef.current || isFixedSize) return;

    const handleResize = () => {
      const viz = vizRef.current;
      if (viz) {
        viz.dispose(); // remove old viz
        setShowViz(false); // force re-render
        setTimeout(() => setShowViz(true), 0); // re-insert viz
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFixedSize]);

  return (
    <div className="flex justify-center items-center min-h-screen w-full overflow-auto relative bg-gray-50">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}

      <div
        ref={containerRef}
        className={`flex justify-center items-center w-full ${isFixedSize ? 'h-auto' : 'h-full'}`}
      >
        {showViz && (
          <div className="flex justify-center items-center">
            <tableau-viz
              id="tableauViz"
              src={tableauUrl}
              toolbar="top"
              style={{ backgroundColor: '#ffffff', border: 'none' }}
            ></tableau-viz>
          </div>
        )}
      </div>
    </div>
  );
};
