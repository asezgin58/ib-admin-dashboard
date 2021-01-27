import {atom} from "recoil";
import {IAuthor} from "../../pages/Author/type";

const initialAuthorData: IAuthor = {
    name: 'Guest',
    surname: 'User',
    age: 26,
    job: 'Developer'
};

export const authorAtom = atom<IAuthor>({
    key: 'authorAtom',
    default: initialAuthorData
});