/**
 * 富文本配置
 */
export const toolbarConfig = {
    /* 工具栏配置 */
    toolbarKeys: [
        'fontSize',
        'header1',
        'header2',
        'header3',
        'header4',
        '|',
        'bold',
        'clearStyle',
        'color',
        'bgColor',
        '|',
        // 菜单组，包含多个菜单
        {
            key: 'group-image', // 必填，要以 group 开头
            title: '图片', // 必填
            // menuKeys: ['uploadImage', 'insertImage', 'deleteImage', 'editImage', 'viewImageLink'],
            menuKeys: ['uploadImage', 'deleteImage']
        },
        // {
        //     key: 'group-link',
        //     title: '链接',
        //     menuKeys: ['insertLink', 'editLink', 'unLink', 'viewLink']
        // },
        {
            key: 'group-table',
            title: '表格',
            menuKeys: [
                'insertTable',
                'deleteTable',
                'insertTableRow',
                'deleteTableRow',
                'insertTableCol',
                'deleteTableCol',
                'tableHeader',
                'tableFullWidth'
            ]
        },
        'divider',
        'blockquote',
        'headerSelect',
        'redo',
        'undo',
    ]
}

/**
 * 富文本编辑器配置
 */
export const editorConfig = {
    placeholder: '请输入内容...',
    hoverbarKeys: {
        image: {
            menuKeys: []
            // menuKeys: ['imageWidth30', 'imageWidth50', 'imageWidth100', "viewImageLink", "deleteImage"],
        },
        text: {
            menuKeys: []
        }
    },
    MENU_CONF: {
        server: '/api/upload',
        // form-data fieldName ，默认值 'wangeditor-uploaded-image'
        fieldName: 'your-custom-name',

        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 1 * 1024 * 1024, // 1M

        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 10,

        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['image/*'],

        // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
        meta: {
            token: 'xxx',
            otherKey: 'yyy'
        },

        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: false,

        // 自定义增加 http  header
        headers: {
            Accept: 'text/x-json',
            otherKey: 'xxx'
        },
        codeSelectLang: {
            // 代码语言
            codeLangs: [
                {
                    text: 'CSS',
                    value: 'css'
                },
                {
                    text: 'HTML',
                    value: 'html'
                },
                {
                    text: 'XML',
                    value: 'xml'
                },
                {
                    text: 'Javascript',
                    value: 'javascript'
                },
                {
                    text: 'Typescript',
                    value: 'typescript'
                },
                {
                    text: 'JSX',
                    value: 'jsx'
                },
                {
                    text: 'Go',
                    value: 'go'
                },
                {
                    text: 'PHP',
                    value: 'php'
                },
                {
                    text: 'C',
                    value: 'c'
                },
                {
                    text: 'Python',
                    value: 'python'
                },
                {
                    text: 'Java',
                    value: 'java'
                },
                {
                    text: 'C++',
                    value: 'cpp'
                },
                {
                    text: 'C#',
                    value: 'csharp'
                },
                {
                    text: 'Visual Basic',
                    value: 'visual-basic'
                },
                {
                    text: 'SQL',
                    value: 'sql'
                },
                {
                    text: 'Ruby',
                    value: 'ruby'
                },
                {
                    text: 'Swift',
                    value: 'swift'
                },
                {
                    text: 'Bash',
                    value: 'bash'
                },
                {
                    text: 'Lua',
                    value: 'lua'
                },
                {
                    text: 'Groovy',
                    value: 'groovy'
                },
                {
                    text: 'Markdown',
                    value: 'markdown'
                }
            ]
        },
        // 跨域是否传递 cookie ，默认为 false
        withCredentials: true,

        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5 秒
        base64LimitSize: 20 * 1024 * 1024,
        uploadImage: {
            server: '/api/upload',
            // form-data fieldName ，默认值 'wangeditor-uploaded-image'
            fieldName: 'your-custom-name',

            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 5 * 1024 * 1024, // 1M

            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 10,

            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['image/*'],

            // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
            meta: {
                token: 'xxx',
                otherKey: 'yyy'
            },
            // 单个文件上传成功之后
            onSuccess(file: File, res: any) {
                // TS 语法
                // onSuccess(file, res) {          // JS 语法
                console.log(`${file.name} 上传成功`, res)
            },

            // 将 meta 拼接到 url 参数中，默认 false
            metaWithUrl: false,

            // 自定义增加 http  header
            headers: {
                Accept: 'text/x-json',
                otherKey: 'xxx'
            },

            // 跨域是否传递 cookie ，默认为 false
            withCredentials: true,

            // 超时时间，默认为 10 秒
            timeout: 5 * 1000, // 5 秒
            base64LimitSize: 20 * 1024 * 1024 // 5kb
        }
    }
}
