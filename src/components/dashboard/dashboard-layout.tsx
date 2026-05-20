"use client";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { GripVertical } from "lucide-react";

export function DashboardLayout({
  leftPanel,
  rightPanel,
  showRightPanel = true,
}: {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  showRightPanel?: boolean;
}) {
  return (
    <main className="flex flex-1 overflow-hidden h-full">
      {/* Desktop Resizable Layout */}
      <div className="hidden lg:flex h-full w-full">
        <PanelGroup direction="horizontal" className="h-full w-full">
          <Panel
            defaultSize={showRightPanel ? 65 : 100}
            minSize={50}
            maxSize={75}
            className="flex flex-col h-full bg-background"
          >
            <div className="flex flex-col h-full overflow-y-auto w-full">
              {leftPanel}
            </div>
          </Panel>

          {showRightPanel && (
            <>
              {/* Note: The pointer-events are naturally attached here for dragging */}
              <PanelResizeHandle className="relative flex w-3 items-stretch justify-center group cursor-col-resize select-none after:absolute after:inset-y-0 after:left-1/2 after:w-px after:-translate-x-1/2 after:bg-border after:transition-colors hover:after:bg-primary/30">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-6 w-3 items-center justify-center rounded-sm border border-border bg-background shadow-sm opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                  <GripVertical className="h-3 w-3 text-muted-foreground" />
                </div>
              </PanelResizeHandle>

              <Panel
                defaultSize={35}
                minSize={25}
                maxSize={50}
                className="flex flex-col h-full bg-card/30"
              >
                <div className="h-full overflow-hidden w-full flex flex-col shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] dark:shadow-none">
                  {rightPanel}
                </div>
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>

      {/* Mobile Stacked Layout */}
      <div className="flex lg:hidden flex-col h-full w-full overflow-y-auto">
        <div className="flex-none">{leftPanel}</div>
        {showRightPanel && (
          <div className="flex-none h-[600px] border-t border-border bg-card/30 shadow-inner">
            {rightPanel}
          </div>
        )}
      </div>
    </main>
  );
}