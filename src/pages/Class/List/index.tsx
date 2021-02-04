import {FC, useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {IUser} from "../type";
import {useHistory} from "react-router-dom";
import {useAxios} from "../../../_common/services/index";
import Button from "../../../components/Button/index";

/**
 * Component File Description
 */
const Index: FC<any> = () => {
    const {push} = useHistory();
    const [userList, setUserList] = useState<IUser[]>([]);

    const [, classRequest] = useAxios({
        url: "https://reqres.in/api/users?per_page=12",
        method: 'get'
    }, {manual: true});

    // eslint-disable-next-line
    const [, deleteClass] = useAxios({
        url: "https://reqres.in/api/users",
        method: 'delete'
    }, {manual: true});


    const getClass = async () => {
        const response: any = await classRequest();
        if (response?.status === 200) {
            setUserList(response?.data?.data);
        }
    };

    useEffect(() => {
        if (!userList.length) {
            getClass();
        }
         //eslint-disable-next-line
    }, []);

    const deleteUser = async (userId: number) => {

        console.log("---delete ", userId);

         const response: any = await deleteClass({
             data: userId
         });
         if (response?.status === 200) {
             getClass();
         }
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <h1>Class List</h1>
                </div>
                <div className="col text-right">
                    <Button
                        text={"YENİ EKLE"}
                        startAdornment={<i className={"far fa-plus"}/>}
                        onClick={() => push("/class/create")}
                        size={"small"}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell/>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userList.map((row: IUser, index: number) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{row.first_name}</TableCell>
                                        <TableCell>{row.last_name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell align="right" style={{width: 100}}>
                                            <Button
                                                iconButton
                                                startAdornment={<i className={"fal fa-edit"}/>}
                                                onClick={() => push(`/class/detail/${row.id}`)}
                                            />
                                        </TableCell>
                                        <TableCell align="right" style={{width: 100}}>
                                            <Button
                                                iconButton
                                                startAdornment={<i className={"fal fa-trash-alt"}/>}
                                                color={"danger"}
                                                onClick={() => deleteUser(row.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

export default Index;