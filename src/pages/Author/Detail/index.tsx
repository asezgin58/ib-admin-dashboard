import {FC} from "react";
import {useRecoilValue} from "recoil";
import {Button} from "../../../components/index";
import {useHistory} from "react-router-dom";
import {IAuthor} from "../type";
import {authorSelector} from "../../../_store/selectors/author";

/**
 * Component File Description
 */
const Detail: FC<any> = () => {
    const {push} = useHistory();
    const author: IAuthor = useRecoilValue<IAuthor>(authorSelector);

    return (
        <>
            <h1>Author</h1>
            <div className="row mb-4">
                <div className="col">
                    {author && <>
                        <div><strong>Name : </strong>{author.name}</div>
                        <div><strong>Surname : </strong>{author.surname}</div>
                        <div><strong>Age : </strong>{author.age}</div>
                        <div><strong>Job : </strong>{author.job}</div>
                    </>}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Button
                        text={"Edit"}
                        onClick={() => push('/author/edit')}
                    />
                </div>
            </div>
        </>
    );
};

export default Detail;