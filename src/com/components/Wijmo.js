import "@grapecity/wijmo.styles/wijmo.css";
// import "./Wijmo.css";

import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination, Icon } from "@/com/components";
import { setLicenseKey } from "@grapecity/wijmo";
import * as wjGrid from "@grapecity/wijmo.react.grid.multirow";
import { Selector } from "@grapecity/wijmo.grid.selector";
import { InputDate, InputTime, InputDateTime, InputNumber, InputMask, ComboBox } from "@grapecity/wijmo.input";
import { CellMaker } from "@grapecity/wijmo.grid.cellmaker";

import { Button } from "@/com/components/Button";
import uuid from "react-uuid";

setLicenseKey(
    "GrapeCity,*.grapecity.com|*.grapecity.com.cn|*.grapecitydev.com|*.grapecity.co.kr|*.grapecity.co.jp,845956964674272#B0SIK4XXbpjInxmZiwiIyY7MzAjMiojIyVmdiwSZzxWYmpjIyNHZisnOiwmbBJye0ICRiwiI34zdnRnWE3EOyBDdnRmY9kDWYR5UFpVSatCMUlDdIFFcnhmdIF5VBxUaW5kUXtiNrhGWERTQ0NmNiV5cK5EMQN5ZypFMPFnbC5GUEdkWrl7MI36cNpUMycURIFkerI7d5FDbnVVVWFXT5F6YIFzQGJ4bmNmbSNXRWBnULlTUwJjTLFHdSJ6by2iSrlXQodWaN34SE54QSlHS6o4cvg5QkFkcYp5bGpmQiR6dUp4LoJ5dztESZVEcmRDVQBDWyVHMOBlQ9YUSalDWWNlbKJHehF6bpl4ZoN4U6VVWBJ5NwkmeIVjavImVF3kb7w6VRBDNvN4ShlVZMVUbSVjUtN7Mud4QmVXZalGdNJnRjRXbYNVMxx4TMZjNiFlW9tURxg6NQ96SyREaKZFUxtUQ7FWUYxEbMNVbqlDNxBlZ8pke8pnQjFEdHtWYRlUOU9kSUlDVORHbk3kV8NlI0IyUiwiIBNjM4kjQ9cjI0ICSiwCNwUDN9ADNzgTM0IicfJye35XX3JSSwIjUiojIDJCLi86bpNnblRHeFBCI4VWZoNFelxmRg2Wbql6ViojIOJyes4nI5kkTRJiOiMkIsIibvl6cuVGd8VEIgIXZ7VWaWRncvBXZSBybtpWaXJiOi8kI1xSfis4N8gkI0IyQiwiIu3Waz9WZ4hXRgAydvJVa4xWdNBybtpWaXJiOi8kI1xSfiQjR6QkI0IyQiwiIu3Waz9WZ4hXRgACUBx4TgAybtpWaXJiOi8kI1xSfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1xSfiUFO7EkI0IyQiwiIu3Waz9WZ4hXRgACdyFGaDxWYpNmbh9WaGBybtpWaXJiOi8kI1tlOiQmcQJCLiczM7MjNwACNwUDMzIDMyIiOiQncDJCLiAnau26YukHdpNWZwFmcn9iKsI7au26YukHdpNWZwFmcn9iKs46bj9idlRWe4l6YlBXYydmLqwibj9SbvNmL9RXajVGchJ7ZuoCLt36YukHdpNWZwFmcn9iKiojIz5GRiwiI9RXaDVGchJ7RiojIh94QiwiIycjM4cjN4YTO6UTO5QDOioKIJl"
);

export const Wijmo = ({ gridRef, schema, pagination, addRow, removeChecked, onSelect, data }) => {
    const navigate = useNavigate();
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

        gridRef.current.control.selectionMode = "Row";
        gridRef.current.control.allowAddNew = true;
        gridRef.current.control.allowDelete = true;
        gridRef.current.control.headerLayoutDefinition = headerLayoutDefinition();
        gridRef.current.control.layoutDefinition = layoutDefinition();

        gridRef.current.control.selectionChanged.addHandler((_, __) => {
            if (!onSelect) return;
            onSelect(_.selectedItems);
        });

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
                    const cells = { ...__, align: "center", allowSorting: true };
                    return cells;
                }),
            };
        });
    };

    const layoutDefinition = () => {
        return body.map((_) => {
            return {
                ..._,
                cells: _.cells.map(({ type, mask, options, link, ...__ }, i) => {
                    const cells = { ...__ };
                    const itemsSource = options;
                    const displayMemberPath = "label";
                    cells.allowSorting = true;

                    if (link) {
                        cells.cellTemplate = CellMaker.makeLink({
                            click: (e, ctx) => {
                                navigate(`/sample/pages/${ctx.value}`);
                            },
                        });
                    }

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

    return (
        <div className="space-y-4">
            {(schema.options?.add || schema.options?.remove) && (
                <div className="flex space-x-2 justify-end">
                    {schema.options?.add && (
                        <Button onClick={addRow}>
                            <Icon icon="plus" size="xs" />
                        </Button>
                    )}
                    {schema.options?.remove && (
                        <Button onClick={removeChecked}>
                            <Icon icon="minus" size="xs" />
                        </Button>
                    )}
                </div>
            )}

            <wjGrid.MultiRow ref={gridRef} />

            {schema.options?.pagination && (
                <Pagination
                    page={pagination.page}
                    size={pagination.size}
                    onChangePage={handleChangePage}
                    onChangeSize={handleChangeSize}
                    totalCount={totalCount}
                />
            )}
        </div>
    );
};
