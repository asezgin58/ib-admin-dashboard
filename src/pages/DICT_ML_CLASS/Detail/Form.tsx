import {FC,useState} from "react";
import {useHistory} from "react-router-dom";

//import * as yup from 'yup';
import {Button, Form, Input} from "../../../components";
import { IDict_ml_class } from "../type";
import {useAxios} from "../../../_common/services";

/**
 * Component File Description
 */
const DetailForm: FC<any> = (props:any) => {
    const {push}: any = useHistory();
    const {formData}=props;

    const [state, setState] = useState<IDict_ml_class>(formData);

    const [, updateClassRequest] = useAxios({
        url: "http://localhost:8080/api/v1/dict_ml_classes/"+ formData.oid,
        method: 'put'
    }, {manual:true});

    const updateClass= async(data:any)=>{
        const response=await updateClassRequest({
            data:data
        });

        if(response?.status===200){
            push('/DICT_ML_CLASS');
        }
    }
   
    const handleSubmit=async(data:IDict_ml_class)=>{
        setState(data);
        updateClass(data);
    }

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                defaultValues={state}                    
            >
                <div className="row mb-4">
                    <div className="col-4">
                        <Input
                            name="status"
                            label="status" 
                        />
                    </div>
                    <div className="col-4">
                        <Input
                            name="lastupdated"
                            label="lastupdated"
                        />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-4" >      
                        <Input
                            name="domain_OID"
                            label="domain_OID"
                        />         
                    </div>
                     <div className="col-4" >      
                        <Input
                            name="project_OID"
                            label="project_OID"
                        />  
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-4" >      
                         <Input
                            name="component_GROUP_OID"
                            label="component_GROUP_OID"
                        />       
                    </div>
                     <div className="col-4" >      
                         <Input
                            name="component_OID"
                            label="component_OID"
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-4" >      
                    <Input
                            name="package_NAME"
                            label="package_NAME"
                        />  
                    </div>
                     <div className="col-4" >      
                     <Input
                            name="name"
                            label="name"
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-4" >      
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

export default DetailForm;