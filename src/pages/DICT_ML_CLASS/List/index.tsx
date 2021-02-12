import { FC, useEffect, useState } from 'react';
import React from 'react';
import { createStyles, fade, InputBase, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Theme, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAxios } from "../../../_common/services/index";
import Button from "../../../components/Button/index";
import { IDict_ml_class } from '../../DICT_ML_CLASS/type';
import SearchBar from 'material-ui-search-bar';
/**
 * Component File Description
 */
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';
function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
interface HeadCell {
    id: keyof IDict_ml_class;
    label: string;
    disablePadding: boolean;

    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: 'oid', disablePadding: true, numeric: false, label: 'OID' },
    { id: 'status', numeric: false, disablePadding: false, label: 'status' },
    { id: 'lastupdated', numeric: false, disablePadding: false, label: 'lastupdated' },
    { id: 'domain_OID', numeric: false, disablePadding: false, label: 'domain_OID' },
    { id: 'project_OID', numeric: false, disablePadding: false, label: 'project_OID' },
    { id: 'component_GROUP_OID', numeric: false, disablePadding: false, label: 'component_GROUP_OID' },
    { id: 'component_OID', numeric: false, disablePadding: false, label: 'component_OID' },
    { id: 'package_NAME', numeric: false, disablePadding: false, label: 'package_NAME' },
    { id: 'name', numeric: false, disablePadding: false, label: 'name' },
    { id: 'description', numeric: false, disablePadding: false, label: 'description' },
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IDict_ml_class) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof IDict_ml_class) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell />
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>

                ))}
            </TableRow>
        </TableHead>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);

const Index: FC<any> = () => {
    const { push } = useHistory();
    const classes = useStyles();

    const [searched, setSearched] = useState<string>("");
    const [selected, setSelected] = React.useState<string[]>([]);
    const [dict_ml_classes_List, setdict_ml_classes_List] = useState<IDict_ml_class[]>([]);
    const [delId, setDelId] = useState<any>(null);
    const [orderBy, setOrderBy] = React.useState<keyof IDict_ml_class>('oid');
    const [order, setOrder] = React.useState<Order>('asc');

    const requestSearch = (searchedVal: string) => {
        const filteredRows = dict_ml_classes_List.filter((row) => {
            return row.oid.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setdict_ml_classes_List(filteredRows);
        
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IDict_ml_class) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const [, dict_ml_classRequest] = useAxios({
        url: "http://localhost:8080/api/v1/dict_ml_classes",
        method: 'get'
    }, { manual: true });

    // eslint-disable-next-line
    const [, delete_dict_ml_class] = useAxios({
        url: "http://localhost:8080/api/v1/dict_ml_classes/" + delId,
        method: 'delete'
    }, { manual: true });
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const getDict_ml_class = async () => {

        const response: any = await dict_ml_classRequest();
        if (response?.status === 200) {
            setdict_ml_classes_List(response?.data);

        }
    };

    useEffect(() => {
        if (!dict_ml_classes_List.length) {
            getDict_ml_class();
        }
        // eslint-disable-next-line
    }, []);

    const deleteClass = async () => {
        if (window.confirm("are you sure")) {
            const response: any = await delete_dict_ml_class();
            if (response?.status === 200) {
                alert('silindi');
                getDict_ml_class();
                setDelId(null);
            }
        }
    }

    useEffect(() => {
        if (delId !== null) {
            deleteClass();
        }
        // eslint-disable-next-line
    }, [delId])

    const deleteDictMlClass = (oid: string) => {
        setDelId(oid);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = dict_ml_classes_List.map((n) => n.oid);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };


    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>DICT_ML_CLASS List</h1>
                </div>
                <div className="col text-right">
                    <Button
                        text={"CREATE"}
                        startAdornment={<i className={"far fa-plus"} />}
                        onClick={() => push("/DICT_ML_CLASS/create")}
                        size={"small"}
                    />
                </div>

            </div>
            <div className="row">
                <div className="col">
                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                                
                            }}
                        />
                    </div> */}
                   <SearchBar
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    /> 

                    <TableContainer component={Paper}>
                        <Table className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table">
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={dict_ml_classes_List.length}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {stableSort(dict_ml_classes_List, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: IDict_ml_class, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>{row.oid}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                            <TableCell>{row.lastupdated}</TableCell>
                                            <TableCell>{row.domain_OID}</TableCell>
                                            <TableCell>{row.project_OID}</TableCell>
                                            <TableCell>{row.component_GROUP_OID}</TableCell>
                                            <TableCell>{row.component_OID}</TableCell>
                                            <TableCell>{row.package_NAME}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell align="right" style={{ width: 100 }}>
                                                <Button
                                                    iconButton
                                                    startAdornment={<i className={"fal fa-edit"} />}
                                                    onClick={() => push(`/DICT_ML_CLASS/detail/${row.oid}`)}
                                                />
                                            </TableCell>
                                            <TableCell align="right" style={{ width: 100 }}>
                                                <Button
                                                    iconButton
                                                    startAdornment={<i className={"fal fa-trash-alt"} />}
                                                    color={"danger"}
                                                    onClick={() => deleteDictMlClass(row.oid)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dict_ml_classes_List.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
};

export default Index;