import "@grapecity/wijmo.styles/wijmo.css";
// import "./Wijmo.css";

import _ from "lodash";
import { useEffect, useState } from "react";
import { Pagination, FormControl } from "@/com/components";
import * as wjGrid from "@grapecity/wijmo.react.grid.multirow";

import { Selector } from "@grapecity/wijmo.grid.selector";
import { InputDate, InputTime, InputDateTime, InputNumber, InputMask, ComboBox, InputDateRange, MultiSelect } from "@grapecity/wijmo.input";
import { Button } from "./Button";
import uuid from "react-uuid";
import { Form } from "react-router-dom";

export const Wijmo = ({ gridRef, schema, pagination, addRow, removeChecked, data }) => {
    // schema
    const head = schema.head;
    const body = schema.body;

    // pagination mode
    const isInnerPagination = schema.options?.pagination === "inner";

    // origin data
    const originContent = data?.content || [];
    const originTotalCount = isInnerPagination ? originContent.length : data?.totCnt || 0;

    const [totalCount, setTotalCount] = useState(originTotalCount);

    useEffect(() => {
        if (!originTotalCount) return;
        setTotalCount(originTotalCount);
    }, [originTotalCount]);

    useEffect(() => {
        if (!gridRef.current) return;
        if (schema.options?.checkbox) new Selector(gridRef.current.control);
        if (schema.options?.isReadOnly) gridRef.current.control.isReadOnly = true;
        gridRef.current.control.allowAddNew = true;
        gridRef.current.control.allowDelete = true;
        // gridRef.current.control.headerLayoutDefinition = headerLayoutDefinition();
        // gridRef.current.control.layoutDefinition = layoutDefinition();

        gridRef.current.control.itemsSourceChanged.addHandler((_) => {
            if (!_.collectionView) return;
            _.collectionView.collectionChanged.addHandler((__) => {
                const { pageSize, sourceCollection } = __;
                if (!isInnerPagination) return;
                setTotalCount((prev) => {
                    const next = sourceCollection.length;
                    const lastPageItemCount = prev % pageSize || pageSize;
                    if (prev < next) {
                        const greater = next - prev > pageSize - lastPageItemCount;
                        if (greater) return next;
                    }
                    if (prev > next) {
                        const less = prev - next >= lastPageItemCount;
                        if (less) return next;
                    }
                    return prev;
                });
            });
        });
    }, []);

    useEffect(() => {
        if (!gridRef.current) return;
        gridRef.current.control.itemsSource = _.cloneDeep(originContent);
        gridRef.current.control.collectionView.pageSize = pagination.size;
    }, [data]);

    const headerLayoutDefinition = () => {
        return head.map((_) => {
            return {
                ..._,
                cells: _.cells.map((__) => {
                    const cells = { ...__, align: "center" };

                    return cells;
                }),
            };
        });
    };

    const layoutDefinition = () => {
        return body.map((_) => {
            return {
                ..._,
                cells: _.cells.map(({ type, mask, options, ...__ }, i) => {
                    const cells = { ...__ };
                    const itemsSource = options;
                    const displayMemberPath = "label";

                    switch (type) {
                        case "number":
                            cells.editor = new InputNumber(document.createElement("div"));
                            break;
                        case "inputmask":
                            cells.editor = new InputMask(document.createElement("div"), { mask });
                            break;
                        case "select":
                            cells.editor = new ComboBox(document.createElement("div"), { itemsSource, displayMemberPath });
                            break;
                        case "date":
                            cells.editor = new InputDate(document.createElement("div"));
                            break;
                        case "time":
                            cells.editor = new InputTime(document.createElement("div"), { step: 5 });
                            cells.format = "h:mm tt";
                            break;
                        case "datetime":
                            cells.editor = new InputDateTime(document.createElement("div"));
                            cells.format = "g";
                            break;
                    }

                    return cells;
                }),
            };
        });
    };

    const handleChangePage = (nextPage) => {
        if (isInnerPagination) {
            gridRef.current.control.collectionView.moveToPage(nextPage);
        } else pagination.setPage(nextPage);
    };

    const handleChangeSize = (nextSize) => {
        if (isInnerPagination) {
            gridRef.current.control.collectionView.pageSize = nextSize;
        } else pagination.setSize(nextSize);
        handleChangePage(0);
    };
    console.log(body);

    return (
        <div className="space-y-4">
            <wjGrid.MultiRow ref={gridRef}>
                {body.map((_) => {
                    return (
                        <wjGrid.MultiRowCellGroup key={uuid()} colspan={_.colspan}>
                            {_.cells.map((__) => {
                                return (
                                    <wjGrid.MultiRowCell key={uuid()} colspan={__.colspan} binding={__.binding}>
                                        <wjGrid.MultiRowCellTemplate
                                            cellType="ColumnHeader"
                                            template={(v) => {
                                                return <input />;
                                            }}
                                        />

                                        <wjGrid.MultiRowCellTemplate
                                            cellType="Cell"
                                            template={(v) => {
                                                return <div>{v.item.textField}</div>;
                                            }}
                                        />

                                        <wjGrid.MultiRowCellTemplate
                                            cellType="CellEdit"
                                            template={(v) => {
                                                console.log(v);
                                                return (
                                                    <div className="flex space-x-2">
                                                        <FormControl defaultValue={v.value} onChange={(e) => (v.value = e.target.value)} />
                                                        <FormControl defaultValue={v.item.textField} onChange={(e) => (v.item.textField = e.target.value)} />
                                                    </div>
                                                );
                                            }}
                                        />
                                    </wjGrid.MultiRowCell>
                                );
                            })}
                        </wjGrid.MultiRowCellGroup>
                    );
                })}
            </wjGrid.MultiRow>
        </div>
    );
};

// {body.map((_) => {
//   return (
//     <wjGrid.MultiRowCellGroup key={uuid()} colspan={_.colspan}>
//       {_.cells.map((__) => {
//         const { colspan, binding, render, ...rest } = __;
//         return (
//           <wjGrid.MultiRowCell key={uuid()} colspan={colspan} binding={binding}>
//             {/* <wjGrid.MultiRowCellTemplate
//               cellType="Cell"
//               template={(ctx) => {
//                 return <div>{ctx.item[binding]}</div>;
//               }}
//             /> */}
//             <wjGrid.MultiRowCellTemplate
//               cellType="CellEdit"
//               template={(ctx) => {
//                 return (
//                   <FormControl
//                     {...rest}
//                     defaultValue={ctx.value}
//                     onChange={(e) => (ctx.value = e.target.value)}
//                   />
//                 );
//               }}
//             />
//           </wjGrid.MultiRowCell>
//         );
//       })}
//     </wjGrid.MultiRowCellGroup>
//   );
// })}
