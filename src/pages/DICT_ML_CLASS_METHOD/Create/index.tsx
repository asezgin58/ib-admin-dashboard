import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Input } from "../../../components";
import { useAxios } from "../../../_common/services";
import * as yup from 'yup';
import { IDict_ml_class_method } from "../type";

const Create: FC<any> = () =>{
    const {push} =useHistory();
    const [state,setState] = useState<IDict_ml_class_method>({
        oid:'',
        status:'',
        lastupdated:'',
        domain_OID:'',
        project_OID:'',
        component_GROUP_OID:'',
        component_OID:'',
        class_OID:'',
        name:'',
        service_name:'',
        is_batch:'',
        batch_type:'',
        batch_table:'',
        description:''

    });

    const [, dictMlClassMethodCreate]= useAxios({
        url:"http://localhost:8080/api/v1/dict_ml_class_methods",
        method:'post'
    },{manual:true});

    const handleSubmit = async (data:IDict_ml_class_method) => {
        setState(data);

        const response = await dictMlClassMethodCreate({
            data:data
        });
        if (response?.status === 200){
            push('/DICT_ML_CLASS_METHOD');
        }
    };
    return (
        <>
            <h1>DICT_ML_CLASS Create Form</h1>
            <Form
                onSubmit={handleSubmit}
                defaultValues={state}
                validationSchema={{
                    oid:yup.string().required('Bu alan zorunludur'),

                }}
            >
                 <div className="row mb-4">
                    <div className="col-4">
                        <Input
                            name="oid"
                            label="oid"
                        />
                    </div>
                    <div className="col-4">
                        <Input
                            name="status"
                            label="status"                         />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-4">
                        <Input
                            name="lastupdated"
                            label="lastupdated"
                        />
                    </div>
                    <div className="col-4">
                        <Input
                            name="domain_OID"
                            label="domain_OID"
                        />
                    </div>
                    </div>
                <div className="row mb-4">
                    <div className="col-4">
                        <Input
                            name="project_OID"
                            label="project_OID"
                        />
                    </div>
                    <div className="col-4">
                        <Input
                            name="component_GROUP_OID"
                            label="component_GROUP_OID"
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-4">
                        <Input
                            name="component_OID"
                            label="component_OID"
                        />
                    </div>
                    <div className="col-4">
                        <Input
                            name="name"
                            label="name"
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    
                    <div className="col-4">
                        <Input
                            name="service_name"
                            label="service_name"
                        />
                    </div>
                    <div className="col-4">
                        <Input
                            name="is_batch"
                            label="is_batch"
                        />
                    </div>
                    
                </div>
                <div className="row mb-4">
                    
                    <div className="col-4">
                        <Input
                            name="batch_type"
                            label="batch_type"
                        />
                    </div>
                    <div className="col-4">
                        <Input
                            name="batch_table"
                            label="batch_table"
                        />
                    </div>
                    
                </div>
                <div className="row mb-4">
                    
                    <div className="col-4">
                        <Input
                            name="description"
                            label="description"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Button type={"submit"} text="Save" color="info"/>
                    </div>
                </div>
                
            </Form>
        </>
    )

};

export default Create;