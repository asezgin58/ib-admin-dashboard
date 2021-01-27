import {selector} from "recoil";
import {authorAtom} from "../atoms/author";
import {IAuthor} from "../../pages/Author/type";

export const authorSelector = selector<IAuthor>({
    key: "authorSelector",
    get: ({get}) => get(authorAtom),
    set: ({set}, newValue) => set(authorAtom, newValue)
});

export const authorFullNameSelector = selector<string>({
    key: "authorFullNameSelector",
    get: ({get}) => {
        const author = get(authorAtom);
        return author.name + ' ' + author.surname;
    },
});