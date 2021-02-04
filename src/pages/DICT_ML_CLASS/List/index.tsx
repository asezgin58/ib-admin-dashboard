import { FC, useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useAxios} from "../../../_common/services/index";
import Button from "../../../components/Button/index";
import { IDict_ml_class } from '../../DICT_ML_CLASS/type';

/**
 * Component File Description
 */


const Index: FC<any> = () => {
    const {push} = useHistory();
    const [dict_ml_classes_List, setdict_ml_classes_List] = useState<IDict_ml_class[]>([]);
    const [delId, setDelId]=useState<any>(null);
    

    const [, dict_ml_classRequest] = useAxios({
        url: "http://localhost:8080/api/v1/dict_ml_classes",
        method: 'get'
    }, {manual: true});

    // eslint-disable-next-line
    const [, delete_dict_ml_class] = useAxios({
        url: "http://localhost:8080/api/v1/dict_ml_classes/"+delId,
        method: 'delete'
    }, {manual: true});


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

    const deleteClass=async()=>{ 
        const response: any = await delete_dict_ml_class();
         if (response?.status === 200) {
             alert('silindi');
             getDict_ml_class();
             setDelId(null);
        }
    }

    useEffect(()=>{
        if(delId!==null){
            deleteClass();
        }
        // eslint-disable-next-line
    }, [delId])

    const deleteDictMlClass =(oid:string) => {
        setDelId(oid);       
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
                        startAdornment={<i className={"far fa-plus"}/>}
                        onClick={() => push("/DICT_ML_CLASS/create")}
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
                                    <TableCell>oid</TableCell>
                                    <TableCell>status</TableCell>
                                    <TableCell>lastupdated</TableCell>
                                    <TableCell>domain_oid</TableCell>
                                    <TableCell>project_oid</TableCell>
                                    <TableCell>component_GROUP_OID</TableCell>
                                    <TableCell>component_oid</TableCell>
                                    <TableCell>package_name</TableCell>
                                    <TableCell>name</TableCell>
                                    <TableCell>description</TableCell>
                                    <TableCell/>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dict_ml_classes_List.map((row: IDict_ml_class, index: number) => (
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
                                        <TableCell align="right" style={{width: 100}}>
                                            <Button
                                                iconButton
                                                startAdornment={<i className={"fal fa-edit"}/>}
                                                onClick={() => push(`/DICT_ML_CLASS/detail/${row.oid}`)}
                                            />
                                        </TableCell>
                                        <TableCell align="right" style={{width: 100}}>
                                            <Button
                                                iconButton
                                                startAdornment={<i className={"fal fa-trash-alt"}/>}
                                                color={"danger"}
                                                onClick={() =>  deleteDictMlClass(row.oid)}
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