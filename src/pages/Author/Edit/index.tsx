import {FC, useState} from 'react';
import * as React from 'react';
import {useRecoilState} from "recoil";
import {Button, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {IAuthor} from "../type";
import {authorSelector} from "../../../_store/selectors/author";

/**
 * Component File Description
 */
const Edit: FC<any> = () => {
    const {push, goBack} = useHistory();
    const [authorAtomValue, setAuthorAtomValue] = useRecoilState<IAuthor>(authorSelector);
    const [author, setAuthor] = useState<IAuthor>(authorAtomValue);

    const handleChange = (e: any) => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setAuthorAtomValue(author);
        push('/author');
    };

    return (
        <>
            <h1>Edit Author</h1>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <div className="row mb-4">
                    <div className="col-3">
                        <TextField name="name" label="Name" variant="outlined" value={author.name} onChange={handleChange}/>
                    </div>
                    <div className="col-3">
                        <TextField name="surname" label="Surname" variant="outlined" value={author.surname} onChange={handleChange}/>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-3">
                        <TextField name="age" label="Age" variant="outlined" value={author.age} onChange={handleChange}/>
                    </div>
                    <div className="col-3">
                        <TextField name="job" label="Job" variant="outlined" value={author.job} onChange={handleChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Button type={"submit"} className={"mr-3"} variant="contained" color="primary">
                            Update
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => goBack()}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Edit;