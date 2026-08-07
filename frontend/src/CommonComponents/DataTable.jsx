import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import "../css/dataTable.css";
import React, { useMemo, useState, forwardRef } from "react";

const normalizeTableData = (value) => {
    if (Array.isArray(value)) return value;

    if (value && typeof value === "object") {
        const possibleKeys = ["data", "rows", "items", "products", "result"];
        for (const key of possibleKeys) {
            if (Array.isArray(value[key])) return value[key];
        }
    }

    return [];
};

const DataTable = forwardRef(
    (
        {
            data,
            columns,
            isRowClick,
            handleRowClick,
            hover = true,
            cursor = true,
            onClose,
            onApply,
            columnFilterState = {},
            setColumnFilterState = () => {},
            filterOptions = {},
        },
        ref
    ) => {
        const memoizedData = useMemo(() => normalizeTableData(data), [data]);
        const memoizedColumns = useMemo(() => columns || [], [columns]);

        const [activeFilter, setActiveFilter] = useState(null);
        const [draftFilter, setDraftFilter] = useState(null);
        const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

        const table = useReactTable({
            data: memoizedData,
            columns: memoizedColumns,
            getCoreRowModel: getCoreRowModel(),
        });

        const toggleFilter = (column, event) => {
            const rect = event.currentTarget.getBoundingClientRect();

            const POPUP_WIDTH = window.innerWidth * 0.65;
            const GAP = 12;
            const SAFE_MARGIN = 16;

            let left;
            if (rect.left < POPUP_WIDTH / 2) {
                left = rect.left;
            } else {
                left = rect.left + rect.width / 2 - POPUP_WIDTH / 2;
            }

            if (left < SAFE_MARGIN) left = SAFE_MARGIN;

            if (left + POPUP_WIDTH > window.innerWidth - SAFE_MARGIN) {
                left = window.innerWidth - POPUP_WIDTH - SAFE_MARGIN;
            }

            setPopupPosition({
                top: rect.bottom + GAP + 6,
                left,
                width: POPUP_WIDTH,
            });

            setDraftFilter(
                columnFilterState?.[column.id] || { selected: [], sortMethod: null }
            );
            setActiveFilter(column);
        };

        const columnFilterCount = (columnId) => {
            const col = columnFilterState?.[columnId];
            if (!col) return 0;

            return (col.selected?.length || 0) + (col.sortMethod ? 1 : 0);
        };

        const applyFilterToTable = (columnId, filter) => {
            table.getColumn(columnId)?.setFilterValue(
                filter.selected.length ? filter.selected : undefined
            );

            if (filter.sortMethod) {
                table.setSorting([{ id: columnId, desc: filter.sortMethod === "desc" }]);
            } else {
                table.setSorting([]);
            }
        };

        const CellWithTooltip = ({ cell, onRowClick, row }) => {
            const textRef = React.useRef(null);
            const [showTooltip, setShowTooltip] = React.useState(false);

            React.useEffect(() => {
                if (!textRef.current) return;

                const isTruncated =
                    textRef.current.scrollWidth > textRef.current.clientWidth;

                setShowTooltip(isTruncated);

                if (isTruncated) {
                    textRef.current.setAttribute(
                        "data-tooltip-content",
                        textRef.current.innerText
                    );
                } else {
                    textRef.current.removeAttribute("data-tooltip-content");
                }
            }, [cell?.getValue()]);

            return (
                <td
                    className="data_table_body_td font-poppins-normal tab-md:text-[12px] tab-m:text-[13px] desk-lg:text-[14px] desk-xl:text-[15px] px-[30px]"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRowClick?.(row?.original);
                    }}
                >
                    <div
                        className={`${cell?.column.id !== "Actions"
                            ? "tab-md:h-[45px] tab-m:h-[49px] desk-lg:h-[52px] flex items-center max-w-[450px]"
                            : ""
                            }`}
                    >
                        <span
                            ref={textRef}
                            className="block truncate whitespace-nowrap overflow-hidden"
                            {...(showTooltip && {
                                "data-tooltip-id": "my-tooltip",
                                "data-tooltip-place": "bottom",
                            })}
                        >
                            {flexRender(cell?.column?.columnDef?.cell, cell.getContext())}
                        </span>
                    </div>
                </td>
            );
        };

        const handleClose = () => {
            setActiveFilter(null);
            onClose?.();
        };

        return (
            <div ref={ref} className="w-full h-full">
                <div className="table_container h-full">
                    <div className="table_scroll_container h-full relative">
                        {memoizedData?.length === 0 && (
                            <div className="text-[20px] text-menuText absolute inset-0 flex items-center justify-center font-poppins-normal">
                                <p>No Data Found</p>
                            </div>
                        )}

                        <table className="data_table">
                            <colgroup>
                                {table.getFlatHeaders().map((header) => (
                                    <col key={header.id} />
                                ))}
                            </colgroup>

                            <thead className="data_table_header">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id} className="data_table_header_row">
                                        {headerGroup.headers.map((header) => {
                                            const isFilterEnabled =
                                                header.column.columnDef.enableColumnFilter === true;

                                            return (
                                                <th
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                    className="tab-md:h-[48px] tab-m:h-[52px] desk-lg:h-[55px] px-[30px]"
                                                >
                                                    <div
                                                        className={`data_table_header_th flex items-center gap-2 font-poppins-medium
                                                        ${isFilterEnabled ? "cursor-pointer" : "cursor-default"}`}
                                                        onClick={(e) => isFilterEnabled && toggleFilter(header.column, e)}
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}

                                                        {isFilterEnabled && (
                                                            GeneralImages?.FilterApply ? (
                                                                <img
                                                                    src={GeneralImages.FilterApply}
                                                                    alt="filter"
                                                                />
                                                            ) : (
                                                                <span className="text-[12px]">☰</span>
                                                            )
                                                        )}

                                                        {isFilterEnabled && columnFilterCount(header.column.id) > 0 && (
                                                            <div className="bg-[#09B12D] w-[20px] h-[20px] rounded-full border-2 border-white text-xs text-white flex items-center justify-center">
                                                                {columnFilterCount(header.column.id)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </thead>

                            {activeFilter && (
                                <>
                                    <div className="fixed inset-0 z-40 bg-black/15" />
                                    <div
                                        className="fixed z-50"
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            top: popupPosition.top,
                                            left: popupPosition.left,
                                            width: popupPosition.width,
                                            maxWidth: "1400px",
                                        }}
                                    >
                                        <FilterPopup
                                            options={(filterOptions?.[activeFilter?.id] || []).map((v) => ({
                                                label: v.name ?? v.value,
                                                value: v.id ?? v.value,
                                            }))}
                                            filter={draftFilter}
                                            setFilter={setDraftFilter}
                                            onClose={handleClose}
                                            onApply={() => {
                                                const appliedFilter = {
                                                    selected: [...(draftFilter?.selected || [])],
                                                    sortMethod: draftFilter?.sortMethod,
                                                };

                                                applyFilterToTable(activeFilter.id, appliedFilter);

                                                setColumnFilterState((prev = {}) => ({
                                                    ...prev,
                                                    [activeFilter.id]: appliedFilter,
                                                }));

                                                handleClose();
                                                onApply?.({ columnId: activeFilter.id, filter: appliedFilter });
                                            }}
                                            totalFilterCount={() => {
                                                const col = columnFilterState?.[activeFilter.id] || { selected: [], sortMethod: null };
                                                return (col.selected?.length || 0) + (col.sortMethod ? 1 : 0);
                                            }}
                                        />
                                    </div>
                                </>
                            )}

                            {memoizedData?.length > 0 && (
                                <tbody className="data_table_body">
                                    {table.getRowModel().rows.map((row) => (
                                        <tr
                                            key={row.id}
                                            className={` ${hover && "data_table_body_tr_hover"} ${cursor || isRowClick ? "cursor-pointer" : "cursor-default"}`}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <CellWithTooltip
                                                    key={cell.id}
                                                    cell={cell}
                                                    row={row}
                                                    onRowClick={handleRowClick}
                                                />
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
);

export default DataTable;