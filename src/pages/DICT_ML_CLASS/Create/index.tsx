import {FC, useState} from "react";
import {Button, Form, Input} from "../../../components";
import * as yup from 'yup';
import {useAxios} from "../../../_common/services";
import {useHistory} from "react-router-dom";
import { IDict_ml_class } from "../type";

/**
 * Component File Description
 */
const Create: FC<any> = () => {
    const {push} = useHistory();
    const [state, setState] = useState<IDict_ml_class>({
        oid: '',
        component_GROUP_OID:'',
        component_OID:'',
        description:'',
        domain_OID:'',
        lastupdated:'',
        name:'',
        package_NAME:'',
        project_OID:'',
        status:''
    });

    const [, dictMlClassCreate] = useAxios({
        url: "http://localhost:8080/api/v1/dict_ml_classes",
        method: 'post'
    }, {manual: true});


    const handleSubmit = async (data:IDict_ml_class) => {
        setState(data);

        console.log(data);
        const response = await dictMlClassCreate({
            data: data
        });

        if (response?.status === 200) {
            push('/DICT_ML_CLASS');
        }
    };


    return (
        <>
            <h1>DICT_ML_CLASS Create Form</h1>
            <Form
                onSubmit={handleSubmit}
                defaultValues={state}
                validationSchema={{
                    oid: yup.string().required('Bu alan zorunludur'),

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
                            name="package_NAME"
                            label="package_NAME"
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    
                    <div className="col-4">
                        <Input
                            name="name"
                            label="name"
                        />
                    </div>
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
    );
};

export default Create;