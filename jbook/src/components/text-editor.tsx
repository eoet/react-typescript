import './text-editor.css';
import MDEditor from '@uiw/react-md-editor';
import React, { useEffect, useRef, useState } from 'react';

interface Props {}

const TextEditor: React.FC<Props> = (props) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState('# Header');

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (
                ref.current &&
                event.target &&
                ref.current.contains(event.target as Node)
            ) {
                console.log('Element clicked on is inside editor');
                return;
            }
            console.log('Element clicked is not inside editor');
            console.log(event.target);
            setEditing(false);
        };
        document.addEventListener('click', listener, {
            capture: true,
        });
        return () => {
            document.removeEventListener('click', listener, {
                capture: true,
            });
        };
    }, []);

    if (editing) {
        return (
            <div className="text-editor" ref={ref}>
                <MDEditor value={value} onChange={(v) => setValue(v || '')} />
            </div>
        );
    }

    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={value} />
            </div>
        </div>
    );
};

export default TextEditor;
