"use client";
import { useState } from "react";
import { Affix } from "vayu-ui"; 

const ScrollPlaceHolder = ({ 
  height = 400, 
  color = "bg-gray-100 dark:bg-gray-700" 
}: { 
  height?: number; 
  color?: string 
}) => (
  <div
    className={`w-full flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 rounded-lg my-4 ${color}`}
    style={{ height }}
  >
    <span className="text-gray-400 dark:text-gray-500 font-mono">
      Scroll Area ({height}px)
    </span>
  </div>
);

// ============================================================================
// Demo Component
// ============================================================================

export default function AffixDemo() {
  // State for the "Custom Target" example
  // We need to store the DOM element to pass it to the Affix `target` prop
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  // State to demonstrate the onAffixed callback
  const [isTopAffixed, setIsTopAffixed] = useState(false);
  const [isBottomAffixed, setIsBottomAffixed] = useState(false);

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-100 pb-20 transition-colors">
      <main className="max-w-4xl mx-auto p-6 space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Top Affix (with Offset)</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            This bar sticks to the top of the viewport with a{" "}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">20px</code> offset.
            It uses <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">zIndex: 50</code>.
          </p>
          
          <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
            {/* 
               WCAG Fix: We pass role="navigation" and aria-label directly via props.
               The component no longer has a hardcoded 'label' prop.
            */}
            <Affix 
              offset={20} 
              zIndex={50} 
              role="navigation"
              aria-label="Sticky Top Navigation"
              onAffixed={(affixed) => setIsTopAffixed(affixed)}
            >
              <div className="bg-indigo-600 dark:bg-indigo-500 text-white p-4 rounded-md shadow-lg flex justify-between items-center">
                <span className="font-bold">Top Sticky Bar</span>
                <span className="text-xs bg-indigo-500 dark:bg-indigo-400 px-2 py-1 rounded">
                  Status: {isTopAffixed ? "Affixed 📌" : "Static 📄"}
                </span>
              </div>
            </Affix>

            <ScrollPlaceHolder height={300} />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. Bottom Affix */}
        {/* ============================================================ */}
        <section>
          <h2 className="text-xl font-semibold mb-2">2. Bottom Affix</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            This bar sticks to the bottom of the viewport. Useful for cookie consents or action bars.
          </p>

          <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
            <ScrollPlaceHolder height={300} />

            <Affix 
              position="bottom" 
              offset={0} 
              zIndex={40}
              onAffixed={(affixed) => setIsBottomAffixed(affixed)}
            >
              <div className="bg-slate-800 dark:bg-slate-600 text-white p-4 rounded-md shadow-lg flex justify-between items-center">
                <div>
                  <p className="font-bold">Bottom Action Bar</p>
                  <p className="text-xs text-slate-300 dark:text-slate-100">Sticks to the bottom edge. {isBottomAffixed ? "(Affixed)" : ""} </p>
                </div>
                <button className="bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 px-4 py-2 rounded text-sm font-medium transition text-white dark:text-green-900">
                  Save Changes
                </button>
              </div>
            </Affix>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. Custom Target Container */}
        {/* ============================================================ */}
        <section>
          <h2 className="text-xl font-semibold mb-2">3. Custom Target Container</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            The Affix can be scoped to a specific scrollable element, 
            not just the window. Scroll inside the box below.
          </p>

          <div
            ref={(node) => setScrollContainer(node)}
            className="h-100 overflow-auto border-2 border-gray-300 dark:border-gray-600 rounded-lg relative bg-gray-100 dark:bg-gray-700"
          >
            <div className="p-4">
              <div className="text-center text-gray-500 dark:text-gray-400 mb-4">
                Start scrolling down inside this box...
              </div>
              
              <ScrollPlaceHolder height={200} color="bg-white dark:bg-gray-800" />
              <ScrollPlaceHolder height={200} color="bg-white dark:bg-gray-800" />

              <Affix target={scrollContainer} position="bottom" offset={10}>
                <div className="bg-amber-400 dark:bg-amber-500 text-amber-900 dark:text-amber-950 p-3 rounded shadow-md text-center font-medium border border-amber-500 dark:border-amber-600">
                  I am stuck to the bottom of the custom container!
                </div>
              </Affix>

              <ScrollPlaceHolder height={300} color="bg-white dark:bg-gray-800" />
              <ScrollPlaceHolder height={200} color="bg-white dark:bg-gray-800" />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. Accessibility & Styles */}
        {/* ============================================================ */}
        <section>
          <h2 className="text-xl font-semibold mb-2">4. Accessibility & Custom Styles</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
            This example passes a custom <code>className</code> and <code>style</code>. 
            It also uses standard <code>aria-label</code> for screen readers.
          </p>

          <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
            <Affix
              offset={80}
              className="bg-linear-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500"
              style={{ borderRadius: '9999px' }}
              role="region"
              aria-label="Special Offer Banner"
            >
              <div className="p-4 text-white text-center font-bold shadow-lg">
                🎉 Custom Styled Banner (Rounded via style prop!)
              </div>
            </Affix>
            <ScrollPlaceHolder height={300} color="bg-pink-50 dark:bg-gray-800" />
          </div>
        </section>

      </main>
    </div>
  );
}