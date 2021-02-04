import {FC, useState} from "react";
import {Button, Form, Input} from "../../../components";
import * as yup from 'yup';
import {useAxios} from "../../../_common/services";
import {useHistory} from "react-router-dom";

/**
 * Component File Description
 */
const Create: FC<any> = () => {
    const {push} = useHistory();
    const [state, setState] = useState<any>({
        newClassId: '',
        newClassName: ''
    });

    const [, classCreate] = useAxios({
        url: "https://reqres.in/api/users",
        method: 'post'
    }, {manual: true});

    const handleSubmit = async (data: any) => {
        setState(data);
        console.log(data);
        const response = await classCreate({
            data: data
        });

        if (response?.status === 201) {
            push('/class');
        }
    };

    return (
        <>
            <h1>Class Create Form</h1>
            <Form
                onSubmit={handleSubmit}
                defaultValues={state}
                validationSchema={{
                    newClassId: yup.string().required('Bu alan zorunludur'),
                    newClassName: yup.string().required('Bu alan zorunludur')
                }}
            >
                <div className="row mb-4">
                    <div className="col-4">
                        <Input
                            name="newClassId"
                            label="Class Id"
                        />
                    </div>
                    <div className="col-4">
                        <Input
                            name="newClassName"
                            label="Class Name"
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