'use client'
import { useRef, useState } from "react";
import { getColorInputSnippet, getTextInputSnippet, getSwitchSnippet, getFontSnippet, getSelectSnippet } from '../app/helper.js'
import CopyToClipboardButton from "@/components/CopyToClipboardButton";
import '../app/styles.css'
import { jsx } from "react/jsx-runtime";


const TemplateHelper = () => {
    const [jsxContent, setJsxContent] = useState('')
    const [fnContent, setFnContent] = useState('')
    const [indexContent, setIndexContent] = useState('')
    const [path, setPath] = useState('')
    const [constructorContent, setConstructorContent] = useState('')

    const inputRef = useRef<any>();
    const selectRef = useRef<any>();

    const addCodeSnippet = () => {
        if (!inputRef.current.value)
            return;
        let type = selectRef?.current?.value;
        let keys = inputRef.current.value.split(',');
        if (type == 'text') {
            let { jsx, fn, index, path } = getTextInputSnippet(keys)
            setJsxContent(jsx)
            setFnContent(fn)
            setIndexContent(index)
            setConstructorContent(null)
            setPath(path)
        } else if (type == 'color') {
            let { constructor, jsx, fn, index, path } = getColorInputSnippet(keys)
            setJsxContent(jsx)
            setFnContent(fn)
            setIndexContent(index)
            setConstructorContent(constructor)
            setPath(path)
        } else if (type == 'switch') {
            let { jsx, fn, index, path } = getSwitchSnippet(keys)
            setJsxContent(jsx)
            setFnContent(fn)
            setConstructorContent(null)
            setIndexContent(index)
            setPath(path)
        } else if (type == 'font') {
            let { jsx,fn,path } = getFontSnippet(keys)
            setJsxContent(jsx)
            setFnContent(fn)
            setConstructorContent(null)
            setIndexContent(null)
            setPath(path)
        }else if (type == 'select') {
            let { jsx,fn,path,index } = getSelectSnippet(keys)
            setJsxContent(jsx)
            setFnContent(fn)
            setPath(path)
            setIndexContent(index)
        }
    }

    return (
        <div className="template-helper mx-2 sm:mx-32">
            <p className="mt-2 mb-3 text-center text-2xl font-semibold leading-relaxed text-gray-900 dark:text-white  dark:text-slate-800">Template Helper</p>

            <div className="key-wrapper m-auto mb-6">
                <form className="mb-4">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  dark:text-slate-800 ">Select Type</label>
                    <select ref={selectRef} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected value={'text'}>Text Input</option>
                        <option value={'color'}>Color Input</option>
                        <option value={'switch'}>Switch</option>
                        <option value={'font'}>Font Settings</option>
                        <option value={'select'}>Select</option>
                    </select>
                </form>
                <div className="mb-4">
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white  dark:text-slate-800 dark:placeholder-gray-400 ">Keys (CSV)</label>
                    <input ref={inputRef} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add comma separated keys" required />
                </div>
                <button onClick={() => addCodeSnippet()} type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Code</button>
                <button onClick={() => { setConstructorContent(''); setJsxContent(''); setFnContent(''); setIndexContent(''); inputRef.current.value = "" }} type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Clear</button>
            </div>
            {constructorContent && <div className="relative flex flex-col mb-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white  dark:text-slate-800">Constructor</p>
                <div className="relative">
                    <textarea className="p-3 mb-5" disabled value={constructorContent}></textarea>
                    <CopyToClipboardButton text={constructorContent} />
                </div>
            </div>}
            {jsxContent && <div className="relative flex flex-col mb-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white  dark:text-slate-800">JSX</p>
                <div className="relative">
                    <textarea className="p-3 mb-5" disabled value={jsxContent}></textarea>
                    <CopyToClipboardButton text={jsxContent} />
                </div>
            </div>}
            {fnContent && <div className="relative flex flex-col mb-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white  dark:text-slate-800 ">Get Value Function {path}</p>
                <div className="relative">
                    <textarea className="p-3 mb-5" disabled value={fnContent}></textarea>
                    <CopyToClipboardButton text={fnContent} />
                </div>
            </div>}
            {indexContent && <div className="relative flex flex-col mb-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-white  dark:text-slate-800 ">Index JS {path}</p>
                <div className="relative">
                    <textarea className="p-3 mb-5" disabled value={indexContent}></textarea>
                    <CopyToClipboardButton text={indexContent} />
                </div>
            </div>}

        </div>
    )
}


export default TemplateHelper