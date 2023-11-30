import { Group, Button, Layout, Editor } from "@/com/components";
import { useEditor } from "@/com/hooks";

export const ExEditor = () => {
    const editor = useEditor({ value: "", placeholder: "Insert Editor value...", readOnly: false });

    return (
        <>
            <Layout>
                <Group>
                    <Group.Header>Editor Example</Group.Header>
                    <Group.Body>
                        <Editor {...editor} />
                    </Group.Body>
                </Group>
                <Button
                    onClick={() => {
                        editor.setEditable(true);
                    }}
                >
                    setEditable
                </Button>
                <Button
                    onClick={() => {
                        editor.setDisabled(true);
                    }}
                >
                    setDisabled(true)
                </Button>

                <Button
                    onClick={() => {
                        editor.setDisabled(false);
                    }}
                >
                    setDisabled(false)
                </Button>
                <Button
                    onClick={() => {
                        editor.setValue("123456");
                    }}
                >
                    setValue
                </Button>
                <Button
                    onClick={() => {
                        console.log(editor.getValue());
                    }}
                >
                    getValue
                </Button>
                <Button
                    onClick={() => {
                        editor.setFocus();
                    }}
                >
                    setFocus
                </Button>
                <Button
                    onClick={() => {
                        editor.blur();
                    }}
                >
                    blur
                </Button>
                <Button
                    onClick={() => {
                        console.log(editor.getLength());
                    }}
                >
                    getLength
                </Button>
                <Button
                    onClick={() => {
                        console.log(editor.getText());
                    }}
                >
                    getText
                </Button>
                <Button
                    onClick={() => {
                        console.log(editor.setText("1234567"));
                    }}
                >
                    setText
                </Button>
            </Layout>
        </>
    );
};
