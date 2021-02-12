import Button from "../../../components/Button/index";
import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAxios } from "../../../_common/services/index";
import { IDict_ml_class_method } from "../../DICT_ML_CLASS_METHOD/type";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";


/**
 * Component File Description
 */

const Index: FC<any> =() =>{
    const {push} = useHistory();
    const [delId,setDelId]=useState<any>(null);
    const [dict_ml_class_methods_List,setdict_ml_class_methods_List]=useState<IDict_ml_class_method[]>([]);
    
    const [, dict_ml_class_methodsRequest]=useAxios({
        url:"http://localhost:8080/api/v1/dict_ml_class_methods",
        method:'get'
    },{manual:true});

    // eslint-disable-next-line
    const [,delete_dict_ml_class_method]=useAxios({
        url:"http://localhost:8080/api/v1/dict_ml_class_methods"+delId,
        method:'delete'
    },{manual:true});


    const getDict_ml_class_method = async() => {

        const response:any =await dict_ml_class_methodsRequest();
        if(response?.status === 200){
            setdict_ml_class_methods_List(response?.data);
        }
    };

    useEffect(()=>{
        if(!dict_ml_class_methods_List.length){
            getDict_ml_class_method();
        }
        //eslint-disable-next-line
    }, []);

   

    const deleteClassMethod=async()=>{
        const response:any = await delete_dict_ml_class_method();
        
        if(response?.status ===200){
            alert('silindi');
            getDict_ml_class_method();
            setDelId(null);
        }
    }
    
    useEffect(()=>{
        if(delId!==null){
            deleteClassMethod();
        }
        //eslint-disable-next-line
    },[delId])

    const deleteDictMlClassMethod=(oid:string)=>{
        setDelId(oid);
    };

    return(
        <>
            <div className="row">
                <div className='col'>
                    <h1>DICT_ML_CLASS_METHOD List</h1>
                </div>
                <div className="col text-right">
                    <Button
                        text={"CREATE"}
                        startAdornment={<i className={"far fa-plus"}/>}
                        onClick={()=>push("/DICT_ML_CLASS_METHOD/create")}
                        size={"small"}
                    />
                </div>
            </div>
            <div className ="row">
                <div className="col">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>oid</TableCell>
                                    <TableCell>status</TableCell>
                                    <TableCell>lastupdated</TableCell>
                                    <TableCell>domain_OID</TableCell>
                                    <TableCell>project_OID</TableCell>
                                    <TableCell>component_GROUP_OID</TableCell>
                                    <TableCell>component_OID</TableCell>
                                    <TableCell>class_OID</TableCell>
                                    <TableCell>name</TableCell>
                                    <TableCell>service_name</TableCell>
                                    <TableCell>is_batch</TableCell>
                                    <TableCell>batch_type</TableCell>
                                    <TableCell>batch_table</TableCell>
                                    <TableCell>description</TableCell>
                                    <TableCell/>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dict_ml_class_methods_List.map((row:IDict_ml_class_method,index: number)=>(
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {index +1}
                                        </TableCell>
                                    <TableCell>{row.oid}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.lastupdated}</TableCell>
                                    <TableCell>{row.domain_OID}</TableCell>
                                    <TableCell>{row.project_OID}</TableCell>
                                    <TableCell>{row.component_GROUP_OID}</TableCell>
                                    <TableCell>{row.component_OID}</TableCell>
                                    <TableCell>{row.class_OID}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.service_name}</TableCell>
                                    <TableCell>{row.is_batch}</TableCell>
                                    <TableCell>{row.batch_type}</TableCell>
                                    <TableCell>{row.batch_table}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell align="right" style={{width: 100}}>
                                            <Button
                                                iconButton
                                                startAdornment={<i className={"fal fa-edit"}/>}
                                                onClick={() => push(`/DICT_ML_CLASS_METHOD/detail/${row.oid}`)}
                                            />
                                        </TableCell>
                                        <TableCell align="right" style={{width: 100}}>
                                            <Button
                                                iconButton
                                                startAdornment={<i className={"fal fa-trash-alt"}/>}
                                                color={"danger"}
                                                onClick={() =>  deleteDictMlClassMethod(row.oid)}
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
