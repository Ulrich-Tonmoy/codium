from tkinter import *
from tkinter import font, colorchooser, filedialog, messagebox
from tkinter.ttk import *
import os
import tempfile
from datetime import datetime


class MainWindow():
    def __init__(self):
        self.app = Tk()
        self.init_ui()

        self.file = ''
        self.font_size = 12
        self.font_family = 'arial'

        scrollbar_y = Scrollbar(self.app)
        scrollbar_y.pack(side=RIGHT, fill=Y)
        self.editor = Text(self.app, yscrollcommand=scrollbar_y.set,
                           font=('arial', 12), undo=True)
        self.editor.pack(fill=BOTH, expand=True)
        scrollbar_y.config(command=self.editor.yview)

        self.editor.bind("<<Modified>>", self.update_status_bar)

        self.app.bind("<Control-n>", self.new_file)
        self.app.bind("<Control-o>", self.open_file)
        self.app.bind("<Control-s>", self.save_file)
        self.app.bind("<Control-Alt-s>", self.save_file_as)
        self.app.bind("<Control-p>", self.print)
        self.app.bind("<Control-d>", self.delete)
        self.app.bind("<Escape>", self.exit_editor)
        self.app.bind("<Control-f>", self.find)
        self.app.bind("<Control-t>", self.date_time)

        self.app.mainloop()

    def init_ui(self):
        self.app.title("Phalcon")
        self.app.iconbitmap(relative_to_native("icons/Phalcon.ico"))
        self.app.geometry("1080x720+250+30")

        self.set_up_menu()
        self.set_up_status_bar()

    def set_up_menu(self):
        menubar = Menu(self.app)
        self.app.config(menu=menubar)

        ###### FILE MENU ###############
        file_menu = Menu(menubar, tearoff=False)
        menubar.add_cascade(label="File", menu=file_menu)

        self.new_img = PhotoImage(file=relative_to_native("icons/new.png"))
        self.open_img = PhotoImage(file=relative_to_native("icons/open.png"))
        self.save_img = PhotoImage(file=relative_to_native("icons/save.png"))
        self.save_as_img = PhotoImage(
            file=relative_to_native("icons/save_as.png"))
        self.print_img = PhotoImage(file=relative_to_native("icons/print.png"))
        self.delete_img = PhotoImage(file=relative_to_native("icons/del.png"))
        self.exit_img = PhotoImage(file=relative_to_native("icons/exit.png"))

        file_menu.add_command(label="New", accelerator="Ctrl+N",
                              image=self.new_img, compound=LEFT, command=self.new_file)
        file_menu.add_command(label="Open", accelerator="Ctrl+O",
                              image=self.open_img, compound=LEFT, command=self.open_file)
        file_menu.add_separator()
        file_menu.add_command(label="Save", accelerator="Ctrl+S",
                              image=self.save_img, compound=LEFT, command=self.save_file)
        file_menu.add_command(
            label="Save As", accelerator="Ctrl+Alt+S", image=self.save_as_img, compound=LEFT, command=self.save_file_as)
        file_menu.add_separator()
        file_menu.add_command(label="Print", accelerator="Ctrl+P",
                              image=self.print_img, compound=LEFT, command=self.print)
        file_menu.add_command(label="Delete", accelerator="Ctrl+D",
                              image=self.delete_img, compound=LEFT, command=self.delete)
        file_menu.add_separator()
        file_menu.add_command(label="Exit", accelerator="Esc",
                              image=self.exit_img, compound=LEFT, command=self.exit_editor)

        ###### EDIT MENU ###############
        edit_menu = Menu(menubar, tearoff=False)
        menubar.add_cascade(label="Edit", menu=edit_menu)

        self.undo_img = PhotoImage(file=relative_to_native("icons/undo.png"))
        self.redo_img = PhotoImage(file=relative_to_native("icons/redo.png"))
        self.cut_img = PhotoImage(file=relative_to_native("icons/cut.png"))
        self.copy_img = PhotoImage(file=relative_to_native("icons/copy.png"))
        self.paste_img = PhotoImage(file=relative_to_native("icons/paste.png"))
        self.find_img = PhotoImage(file=relative_to_native("icons/find.png"))
        self.calender_img = PhotoImage(
            file=relative_to_native("icons/calender.png"))
        self.select_img = PhotoImage(
            file=relative_to_native("icons/select_all.png"))
        self.clear_img = PhotoImage(
            file=relative_to_native("icons/clear_all.png"))

        edit_menu.add_command(label="Undo", accelerator="Ctrl+Z",
                              image=self.undo_img, compound=LEFT)
        edit_menu.add_command(label="Redo", accelerator="Ctrl+Y",
                              image=self.redo_img, compound=LEFT)
        edit_menu.add_separator()
        edit_menu.add_command(label="Cut", accelerator="Ctrl+X",
                              image=self.cut_img, compound=LEFT, command=lambda: self.editor.event_generate('<Control x>'))
        edit_menu.add_command(label="Copy", accelerator="Shift+C",
                              image=self.copy_img, compound=LEFT, command=lambda: self.editor.event_generate('<Control c>'))
        edit_menu.add_command(label="Paste", accelerator="Ctrl+V",
                              image=self.paste_img, compound=LEFT, command=lambda: self.editor.event_generate('<Control v>'))
        edit_menu.add_separator()
        edit_menu.add_command(label="Find", accelerator="Ctrl+F",
                              image=self.find_img, compound=LEFT, command=self.find)
        edit_menu.add_command(label="Time/Date", accelerator="Ctrl+T",
                              image=self.calender_img, compound=LEFT, command=self.date_time)
        edit_menu.add_separator()
        edit_menu.add_command(label="Select All", accelerator="Ctrl+A",
                              image=self.select_img, compound=LEFT, command=self.select_all)
        edit_menu.add_command(label="Clear", accelerator="Ctrl+Shift+D",
                              image=self.clear_img, compound=LEFT, command=lambda: self.editor.delete(0.0, END))

        ###### VIEW MENU ###############
        view_menu = Menu(menubar, tearoff=False)
        menubar.add_cascade(label="View", menu=view_menu)

        self.show_toolbar = BooleanVar()
        self.show_toolbar.set(True)
        self.show_statusbar = BooleanVar()
        self.show_statusbar.set(True)

        view_menu.add_checkbutton(
            label="Tool Bar", variable=self.show_toolbar, onvalue=True, offvalue=False, command=self.toolbar_toggle)
        view_menu.add_checkbutton(
            label="Status Bar", variable=self.show_statusbar, onvalue=True, offvalue=False, command=self.statusbar_toggle)

        ###### THEME MENU ###############
        theme_menu = Menu(menubar, tearoff=False)
        menubar.add_cascade(label="Themes", menu=theme_menu)

        self.theme = StringVar()

        self.light_img = PhotoImage(
            file=relative_to_native("icons/light_default.png"))
        self.light_plus_img = PhotoImage(
            file=relative_to_native("icons/light_plus.png"))
        self.dark_img = PhotoImage(file=relative_to_native("icons/dark.png"))
        self.blue_img = PhotoImage(file=relative_to_native("icons/blue.png"))
        self.red_img = PhotoImage(file=relative_to_native("icons/red.png"))
        self.monokai_img = PhotoImage(
            file=relative_to_native("icons/monokai.png"))

        theme_menu.add_radiobutton(label="Light Default",
                                   image=self.light_img, variable=self.theme, compound=LEFT, command=lambda: self.change_theme('white', 'black'))
        theme_menu.add_radiobutton(label="Light Plus",
                                   image=self.light_plus_img, variable=self.theme, compound=LEFT, command=lambda: self.change_theme('white', 'black'))
        theme_menu.add_radiobutton(label="Dark",
                                   image=self.dark_img, variable=self.theme, compound=LEFT, command=lambda: self.change_theme('black', 'white'))
        theme_menu.add_radiobutton(label="Blue",
                                   image=self.blue_img, variable=self.theme, compound=LEFT, command=lambda: self.change_theme('blue', 'white'))
        theme_menu.add_radiobutton(label="Red",
                                   image=self.red_img, variable=self.theme, compound=LEFT, command=lambda: self.change_theme('pink', 'blue'))
        theme_menu.add_radiobutton(label="Monokai",
                                   image=self.monokai_img, variable=self.theme, compound=LEFT, command=lambda: self.change_theme('orange', 'black'))

        ###### TOOLBAR MENU ###############
        self.toolbar = Label(self.app)
        self.toolbar.pack(side=TOP, fill=X)

        font_lits = sorted(font.families())
        self.selected_font = StringVar()
        font_family_combobox = Combobox(
            self.toolbar, width=30, values=font_lits, state='readonly', textvariable=self.selected_font)
        font_family_combobox.current(font_lits.index('Arial'))
        font_family_combobox.grid(row=0, column=0, padx=5)

        self.selected_font_size = IntVar()
        font_size_combobox = Combobox(
            self.toolbar, width=5, textvariable=self.selected_font_size, values=tuple(range(8, 81)))
        font_size_combobox.current(4)
        font_size_combobox.grid(row=0, column=1)

        font_family_combobox.bind('<<ComboboxSelected>>', self.set_font_family)
        font_size_combobox.bind('<<ComboboxSelected>>', self.set_font_size)

        self.bold_img = PhotoImage(file=relative_to_native("icons/bold.png"))
        bold_button = Button(self.toolbar, image=self.bold_img,
                             command=self.bold_text)
        bold_button.grid(row=0, column=2, padx=5)

        self.italic_img = PhotoImage(
            file=relative_to_native("icons/italic.png"))
        italic_button = Button(self.toolbar, image=self.italic_img,
                               command=self.italic_text)
        italic_button.grid(row=0, column=3)

        self.underline_img = PhotoImage(
            file=relative_to_native("icons/underline.png"))
        underline_button = Button(
            self.toolbar, image=self.underline_img, command=self.underline_text)
        underline_button.grid(row=0, column=4, padx=5)

        self.font_color_img = PhotoImage(
            file=relative_to_native("icons/font_color.png"))
        font_color_button = Button(
            self.toolbar, image=self.font_color_img, command=self.color_text)
        font_color_button.grid(row=0, column=5)

        self.left_img = PhotoImage(file=relative_to_native("icons/left.png"))
        left_button = Button(self.toolbar, image=self.left_img,
                             command=self.align_left)
        left_button.grid(row=0, column=6, padx=5)

        self.center_img = PhotoImage(
            file=relative_to_native("icons/center.png"))
        center_button = Button(self.toolbar, image=self.center_img,
                               command=self.align_center)
        center_button.grid(row=0, column=7)

        self.right_img = PhotoImage(file=relative_to_native("icons/right.png"))
        right_button = Button(self.toolbar, image=self.right_img,
                              command=self.align_right)
        right_button.grid(row=0, column=8, padx=5)

    def set_up_status_bar(self):
        self.status_bar = Label(self.app, text="Status Bar")
        self.status_bar.pack(side=BOTTOM)

    def update_status_bar(self, event):
        if self.editor.edit_modified():
            word_len = len(self.editor.get(0.0, END).split())
            char_len = len(self.editor.get(0.0, 'end-1c'))
            self.status_bar.config(
                text=f'Characters: {char_len} Words: {word_len}')

            if self.file != '':
                self.app.title(os.path.basename(self.file) + "- Phalcon*")
            else:
                self.app.title("Untitled*")

        self.editor.edit_modified(False)

    def new_file(self, event=None):

        self.editor.delete(0.0, END)
        self.app.title("Untitled*")
        self.file = ''

    def open_file(self, event=None):
        self.new_file()

        self.file = filedialog.askopenfilename(initialdir=os.getcwd, title="Select file", filetypes=(
            ('Phalcon File', 'p'), ('Text File', 'txt'), ('All Files', '*.*')))

        if self.file != '':
            data = open(self.file, 'r')
            self.editor.insert(0.0, data.read())

        self.app.title(os.path.basename(self.file) + "- Phalcon")

    def save_file(self, event=None):

        if self.file == '':
            self.save_file_as()
        else:
            data = self.editor.get(0.0, END)
            o_file = open(self.file, 'w')
            o_file.write(data)
            o_file.close()
            self.app.title(os.path.basename(self.file) + "- Phalcon")
            self.editor.edit_modified(False)

    def save_file_as(self, event=None):

        new_file = filedialog.asksaveasfile(mode='w', defaultextension='.p', filetypes=(
            ('Phalcon File', 'p'), ('Text File', 'txt'), ('All Files', '*.*')))
        if new_file is None:
            pass
        else:
            data = self.editor.get(0.0, END)
            new_file.write(data)
            new_file.close()
            self.file = new_file.name
            self.app.title(os.path.basename(new_file.name) + "- Phalcon")
            self.editor.edit_modified(False)

    def print(self, event=None):
        file = tempfile.mktemp('.txt')
        open(file, 'w').write(self.editor.get(0.0, END))
        os.startfile(file, 'print')

    def delete(self, event=None):

        if self.file != '':
            os.remove(self.file)
            self.new_file()

    def exit_editor(self, event=None):
        if self.editor.edit_modified():
            res = messagebox.askyesnocancel(
                'Warning', 'Do you want to save the changes?')
            if res is True:
                self.save_file()
                self.app.destroy()
            if res is False:
                self.app.destroy()
        else:
            self.app.destroy()

    def find(self, event=None):
        def close_find_window():
            self.editor.tag_remove('match', 1.0, END)
            find_window.destroy()

        def find_word():
            self.editor.tag_remove('match', 1.0, END)
            start_pos = '1.0'
            word = find_field.get()
            if word:
                while True:
                    start_pos = self.editor.search(
                        word, start_pos, stopindex=END)
                    if not start_pos:
                        break
                    end_pos = f'{start_pos}+{len(word)}c'
                    self.editor.tag_add('match', start_pos, end_pos)
                    self.editor.tag_config('match', foreground='red',
                                           background='yellow')
                    start_pos = end_pos

        def replace_text():
            word = find_field.get()
            replace_word = replace_field.get()
            if replace_word:
                data = self.editor.get(1.0, END)
                new_data = data.replace(word, replace_word)
                self.editor.delete(1.0, END)
                self.editor.insert(1.0, new_data)

        find_window = Toplevel()

        find_window.title("Find")
        find_window.iconbitmap(relative_to_native("icons/Phalcon.ico"))
        find_window.geometry("350x200+500+200")
        find_window.resizable(0, 0)

        label_frame = LabelFrame(find_window, text='Find/Replace')
        label_frame.pack(pady=30)

        find_label = Label(label_frame, text="Find")
        find_label.grid(row=0, column=0, padx=5, pady=5)
        find_field = Entry(label_frame)
        find_field.grid(row=0, column=1, padx=5, pady=5)

        replace_label = Label(label_frame, text="Replace")
        replace_label.grid(row=1, column=0, padx=5, pady=5)
        replace_field = Entry(label_frame)
        replace_field.grid(row=1, column=1, padx=5, pady=5)

        find_button = Button(label_frame, text="Find", command=find_word)
        find_button.grid(row=2, column=0, padx=5, pady=5)
        replace_button = Button(
            label_frame, text="Replace", command=replace_text)
        replace_button.grid(row=2, column=1, padx=5, pady=5)

        find_window.protocol('WM_DELETE_WINDOW', close_find_window)
        find_window.mainloop()

    def date_time(self, event=None):
        date = datetime.now().strftime('%B %d, %y %H:%M:%S')
        self.editor.insert(1.0, date)

    def select_all(self):
        self.editor.tag_add('sel', '1.0', END)

    def statusbar_toggle(self):
        if self.show_statusbar.get() == False:
            self.status_bar.pack_forget()
        else:
            self.status_bar.pack()

    def toolbar_toggle(self):
        if self.show_toolbar.get() == False:
            self.toolbar.pack_forget()
        elif self.show_toolbar.get() == True:
            self.editor.pack_forget()
            self.toolbar.pack(fill=X)
            self.editor.pack(fill=BOTH, expand=1)
            if self.show_statusbar.get() == True:
                self.status_bar.pack_forget()
                self.status_bar.pack()

    def change_theme(self, bg_color, fg_color):
        self.editor.config(bg=bg_color, fg=fg_color)

    def set_font_family(self, event):

        font_family = self.selected_font.get()
        self.editor.config(font=(font_family, self.font_size))

    def set_font_size(self, event):

        font_size = self.selected_font_size.get()
        self.editor.config(font=(self.font_family, font_size))

    def bold_text(self):
        text_property = font.Font(font=self.editor['font']).actual()
        if text_property['weight'] == 'bold':
            self.editor.config(
                font=(self.font_family, self.font_size, 'normal'))
        else:
            self.editor.config(font=(self.font_family, self.font_size, 'bold'))

    def italic_text(self):
        text_property = font.Font(font=self.editor['font']).actual()
        if text_property['slant'] == 'roman':
            self.editor.config(
                font=(self.font_family, self.font_size, 'italic'))
        else:
            self.editor.config(
                font=(self.font_family, self.font_size, 'roman'))

    def underline_text(self):
        text_property = font.Font(font=self.editor['font']).actual()
        if text_property['underline'] == 0:
            self.editor.config(
                font=(self.font_family, self.font_size, 'underline'))
        else:
            self.editor.config(font=(self.font_family, self.font_size))

    def color_text(self):
        color = colorchooser.askcolor()
        self.editor.config(fg=(color[1]))

    def align_left(self):
        data = self.editor.get(0.0, END)
        self.editor.tag_config('left', justify=LEFT)
        self.editor.delete(0.0, END)
        self.editor.insert(INSERT, data, 'left')

    def align_center(self):
        data = self.editor.get(0.0, END)
        self.editor.tag_config('center', justify=CENTER)
        self.editor.delete(0.0, END)
        self.editor.insert(INSERT, data, 'center')

    def align_right(self):
        data = self.editor.get(0.0, END)
        self.editor.tag_config('right', justify=RIGHT)
        self.editor.delete(0.0, END)
        self.editor.insert(INSERT, data, 'right')


def relative_to_native(path):
    base_path = os.path.dirname(os.path.abspath(__file__))
    path = path.replace('/', '\\')

    return os.path.join(base_path, path)


if __name__ == '__main__':
    window = MainWindow()
