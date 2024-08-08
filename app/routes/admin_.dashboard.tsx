import mongoose from "mongoose";
import { useState, useRef, useEffect } from "react";
import { Form, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { Editor } from '@tinymce/tinymce-react';
import { uploadImage } from "~/services/uploadImage";

export const loader = async ({ request }) => {
    const projects = await mongoose.model("Project").find();

    return { projects };
};

export const meta = [
    {
        title: "Admin Dashboard",
        description: "Admin Dashboard",
    }
];

export default function AdminDashboard() {
    const { projects } = useLoaderData();
    const fetcher = useFetcher();
    const editorRef = useRef(null);
    const [projectModalOpen, setProjectModalOpen] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const User = sessionStorage.getItem("token") || null;
        if (User === null) {
            return redirect("/");
        }
    }, []);

    const handleChange = (e) => {
        const body = e;
        const textarea = document.querySelector("textarea[name=body]");
        textarea.value = body;
    }
    return (
        <div className="content" style={{ marginTop: "50px" }}>
            <button onClick={() => {
                setProjectModalOpen(true);
            }}>
                Create new Project
            </button>
            {projectModalOpen && (
                <div>
                    <fetcher.Form method="post" encType="multipart/form-data">
                        <fieldset disabled={fetcher.state === "submitting"}>
                            {
                                image && (
                                    <img src={image} alt="Preview" />
                                )
                            }
                            <div>
                                <label htmlFor="image">Image</label>
                                <input className="input-fields" type="file" id="image" name="image" onChange={(e) => {
                                    setImage(URL.createObjectURL(e.target.files[0]));
                                }} />
                            </div>
                            <label htmlFor="title">Title</label><br></br>
                            <input type="text" name="title" />
                            <Editor
                                apiKey='3ioqryb6do0jjs1dqe42hr1sf7nkuzwi1ig8qu2wx8xtvxzq'
                                onInit={(evt, editor) => editorRef.current = editor}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    inline: false,
                                    language: 'da',
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
                                        'imagetools', 'textpattern', 'autoresize', 'codesample',
                                        'save', 'directionality', 'emoticons', 'hr', 'nonbreaking', 'pagebreak',
                                        'paste', 'tabfocus', 'textcolor', 'colorpicker', 'textpattern',
                                        'contextmenu', 'noneditable', 'template', 'toc', 'visualchars',
                                        'linkchecker', 'advlist', 'autosave', 'bbcode',
                                    ],
                                    menu: {
                                        file: { title: 'File', items: 'newdocument restoredraft | preview | export print | deleteallconversations' },
                                        edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                                        view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
                                        insert: { title: 'Insert', items: 'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
                                        format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                                        tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
                                        table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
                                        help: { title: 'Help', items: 'help' }
                                    },
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'link image | codesample |',
                                    toolbar2: 'fontselect fontsizeselect formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | codesample | removeformat',
                                    image_advtab: true,
                                    toolbar_float: true,
                                    toolbar_sticky: true,
                                    /* enable title field in the Image dialog*/
                                    image_title: true,
                                    /* enable automatic uploads of images represented by blob or data URIs*/
                                    automatic_uploads: true,
                                    /*
                                        URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                                        images_upload_url: 'postAcceptor.php',
                                        here we add custom filepicker only to Image dialog
                                    */
                                    file_picker_types: 'image',
                                    images_upload_url: 'https://firebasestorage.googleapis.com/v0/b/devhelp-3e125.appspot.com/o/',
                                    /* and here's our custom image picker*/
                                    file_picker_callback: (cb, value, meta) => {
                                        const input = document.createElement('input');
                                        input.setAttribute('type', 'file');
                                        input.setAttribute('accept', 'image/*');

                                        input.addEventListener('change', (e) => {
                                            const file = e.target.files[0];

                                            const reader = new FileReader();
                                            reader.addEventListener('load', () => {
                                                /*
                                                Note: Now we need to register the blob in TinyMCEs image blob
                                                registry. In the next release this part hopefully won't be
                                                necessary, as we are looking to handle it internally.
                                                */
                                                const id = 'blobid' + (new Date()).getTime();
                                                const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                                const base64 = reader.result.split(',')[1];
                                                const blobInfo = blobCache.create(id, file, base64);
                                                blobCache.add(blobInfo);

                                                /* call the callback and populate the Title field with the file name */
                                                cb(blobInfo.blobUri(), { title: file.name });
                                            });
                                            reader.readAsDataURL(file);
                                        });

                                        input.click();
                                    },
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                                onEditorChange={handleChange}
                            />
                            <textarea style={{
                                display: "block"
                            }} name="description" defaultValue={editorRef?.current?.getContent()}>
                                {editorRef.current?.getContent()}
                            </textarea>
                            <button type="submit">Create Project</button>
                        </fieldset>
                    </fetcher.Form>
                </div>
            )}
        </div>
    );
}

export const action = async ({ request }) => {

    const formData = await request.formData();
    const post = Object.fromEntries(formData);

    const image = post.image;
    let newImage = null;
    if (image && image._name) {
        newImage = await uploadImage(image);
        if (!image) {
            return new Response(null, {
                status: 400,
                statusText: "Bad Request",
            });
        }
    }

    post.link = post.title.toLowerCase().replace(/ /g, "-");
    post.image = newImage;

    const newPost = await mongoose.models.Project.create(post);

    if (newPost) {
        return redirect("/admin/dashboard");
    } else {
        return new Response(null, {
            status: 500,
            statusText: "Internal Server Error",
        });
    }

}