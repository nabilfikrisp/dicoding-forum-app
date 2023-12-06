import { type Editor } from '@tiptap/react';
import { Toggle } from './ui/toggle';
import {
  BoldIcon,
  HeadingIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  StrikethroughIcon,
} from 'lucide-react';

const ToolBar = ({ editor }: { editor: Editor | null }) => {
  if (editor === null) {
    return null;
  }
  return (
    <div className="flex gap-1 rounded-lg border border-input bg-inherit">
      <Toggle
        size="sm"
        pressed={editor.isActive('heading')}
        onPressedChange={() => {
          editor.chain().focus().toggleHeading({ level: 4 }).run();
        }}
        className="border-r border-input"
      >
        <HeadingIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
        }}
        className="border-r border-input"
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run();
        }}
        className="border-r border-input"
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run();
        }}
        className="border-r border-input"
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
        className="border-r border-input"
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
        className="border-r border-input"
      >
        <ListIcon className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default ToolBar;
