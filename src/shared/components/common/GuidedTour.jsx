import React, { useState, useEffect } from 'react';
import styles from './GuidedTour.module.css';

const TOOLTIP_W = 310;
const TOOLTIP_H = 190;
const MARGIN = 14;

const GuidedTour = ({ steps = [], onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [highlightRect, setHighlightRect] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    positionTooltip();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const positionTooltip = () => {
    const step = steps[currentStep];
    if (!step?.target) {
      setHighlightRect(null);
      return;
    }
    const el = document.querySelector(step.target);
    if (!el) {
      setHighlightRect(null);
      return;
    }

    // Scroll element into view so it's visible
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Use a small delay to let scroll settle
    setTimeout(() => {
      const rect = el.getBoundingClientRect();
      setHighlightRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Try below first
      let top = rect.bottom + MARGIN;
      let left = rect.left + rect.width / 2 - TOOLTIP_W / 2;

      // Flip above if below goes off-screen
      if (top + TOOLTIP_H > vh - 20) {
        top = rect.top - TOOLTIP_H - MARGIN;
      }

      // If above also off-screen (element near top), center vertically
      if (top < 20) {
        top = Math.max(20, (vh - TOOLTIP_H) / 2);
      }

      // Clamp horizontally
      if (left + TOOLTIP_W > vw - 16) left = vw - TOOLTIP_W - 16;
      if (left < 16) left = 16;

      setTooltipPos({ top, left });
    }, 120);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
    else handleFinish();
  };

  const handleFinish = () => {
    setVisible(false);
    setTimeout(() => onFinish && onFinish(), 350);
  };

  if (!visible || !steps.length) return null;

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className={styles.overlay}>
      {/* Spotlight */}
      {highlightRect && (
        <svg className={styles.spotlight} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              <rect
                x={highlightRect.left - 8}
                y={highlightRect.top - 8}
                width={highlightRect.width + 16}
                height={highlightRect.height + 16}
                rx="12"
                fill="black"
              />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(13, 27, 62, 0.75)" mask="url(#spotlight-mask)" />
          <rect
            x={highlightRect.left - 8}
            y={highlightRect.top - 8}
            width={highlightRect.width + 16}
            height={highlightRect.height + 16}
            rx="12"
            fill="none"
            stroke="rgba(87, 168, 255, 0.9)"
            strokeWidth="2.5"
          />
        </svg>
      )}

      {!highlightRect && <div className={styles.fullDim} />}

      {/* Tooltip Card */}
      <div
        className={styles.tooltip}
        style={
          highlightRect
            ? { top: tooltipPos.top, left: tooltipPos.left, transform: 'none' }
            : {}
        }
      >
        {/* Header */}
        <div className={styles.tooltipHeader}>
          <div className={styles.stepBadge}>
            <span className={styles.stepIcon}>{step.icon}</span>
          </div>
          <button className={styles.skipBtn} onClick={handleFinish}>
            Skip Tour
          </button>
        </div>

        {/* Content */}
        <div className={styles.tooltipContent}>
          <h3 className={styles.tooltipTitle}>{step.title}</h3>
          <p className={styles.tooltipDesc}>{step.description}</p>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {/* Footer */}
        <div className={styles.tooltipFooter}>
          <span className={styles.stepCounter}>{currentStep + 1} / {steps.length}</span>
          <div className={styles.stepDots}>
            {steps.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${i === currentStep ? styles.dotActive : ''} ${i < currentStep ? styles.dotDone : ''}`}
              />
            ))}
          </div>
          <button className={styles.nextBtn} onClick={handleNext}>
            {isLast ? '🎉 Finish' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidedTour;
