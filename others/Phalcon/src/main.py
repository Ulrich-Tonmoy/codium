from tkinter import *
from tkinter import font, colorchooser, filedialog, messagebox
from tkinter.ttk import *
import os

file = ''


def new_file():
    global file
    editor.delete(0.0, END)
    file = ''


def open_file():
    new_file()
    global file
    file = filedialog.askopenfilename(initialdir=os.getcwd, title="Select file", filetypes=(
        ('Text File', 'txt'), ('Phalcon File', 'p'), ('All Files', '*.*')))

    if file != '':
        data = open(file, 'r')
        editor.insert(0.0, data.read())

    app.title(os.path.basename(file) + "- Phalcon")


def save_file():
    global file
    if file == '':
        save_file_as()
    else:
        data = editor.get(0.0, END)
        file = open(file, 'w')
        file.write(data)


def save_file_as():
    new_file = filedialog.asksaveasfile(mode='w', defaultextension='.p', filetypes=(
        ('Phalcon File', 'p'), ('Text File', 'txt'), ('All Files', '*.*')))
    data = editor.get(0.0, END)
    new_file.write(data)


def exit_editor():
    if editor.edit_modified():
        res = messagebox.askyesnocancel(
            'Warning', 'Do you want to save the changes?')
        if res is True:
            save_file()
            app.destroy()
        if res is False:
            app.destroy()
    else:
        app.destroy()


def delete():
    global file
    if file != '':
        new_file()
        os.remove(file)
        file = ''


font_size = 12
font_family = 'arial'


def set_font_family(event):
    global font_family
    font_family = selected_font.get()
    editor.config(font=(font_family, font_size))


def set_font_size(event):
    global font_size
    font_size = selected_font_size.get()
    editor.config(font=(font_family, font_size))


def bold_text():
    text_property = font.Font(font=editor['font']).actual()
    if text_property['weight'] == 'bold':
        editor.config(font=(font_family, font_size, 'normal'))
    else:
        editor.config(font=(font_family, font_size, 'bold'))


def italic_text():
    text_property = font.Font(font=editor['font']).actual()
    if text_property['slant'] == 'roman':
        editor.config(font=(font_family, font_size, 'italic'))
    else:
        editor.config(font=(font_family, font_size, 'roman'))


def underline_text():
    text_property = font.Font(font=editor['font']).actual()
    if text_property['underline'] == 0:
        editor.config(font=(font_family, font_size, 'underline'))
    else:
        editor.config(font=(font_family, font_size))


def color_text():
    color = colorchooser.askcolor()
    editor.config(fg=(color[1]))


def align_left():
    data = editor.get(0.0, END)
    editor.tag_config('left', justify=LEFT)
    editor.delete(0.0, END)
    editor.insert(INSERT, data, 'left')


def align_center():
    data = editor.get(0.0, END)
    editor.tag_config('center', justify=CENTER)
    editor.delete(0.0, END)
    editor.insert(INSERT, data, 'center')


def align_right():
    data = editor.get(0.0, END)
    editor.tag_config('right', justify=RIGHT)
    editor.delete(0.0, END)
    editor.insert(INSERT, data, 'right')


app = Tk()
app.title("Phalcon")
app.iconbitmap("./src/icons/Phalcon.ico")
app.geometry("1080x720+250+30")


menubar = Menu(app)
app.config(menu=menubar)

###### FILE MENU ###############
file_menu = Menu(menubar, tearoff=False)
menubar.add_cascade(label="File", menu=file_menu)

new_img = PhotoImage(file="./src/icons/new.png")
open_img = PhotoImage(file="./src/icons/open.png")
save_img = PhotoImage(file="./src/icons/save.png")
save_as_img = PhotoImage(file="./src/icons/save_as.png")
exit_img = PhotoImage(file="./src/icons/exit.png")

file_menu.add_command(label="New", accelerator="Ctrl+N",
                      image=new_img, compound=LEFT, command=new_file)
file_menu.add_command(label="Open", accelerator="Ctrl+O",
                      image=open_img, compound=LEFT, command=open_file)
file_menu.add_separator()
file_menu.add_command(label="Save", accelerator="Ctrl+S",
                      image=save_img, compound=LEFT, command=save_file)
file_menu.add_command(
    label="Save As", accelerator="Ctrl+Shift+S", image=save_as_img, compound=LEFT, command=save_file_as)
file_menu.add_separator()
file_menu.add_command(label="Exit", accelerator="Esc",
                      image=exit_img, compound=LEFT, command=exit_editor)

###### EDIT MENU ###############
edit_menu = Menu(menubar, tearoff=False)
menubar.add_cascade(label="Edit", menu=edit_menu)

undo_img = PhotoImage(file="./src/icons/undo.png")
redo_img = PhotoImage(file="./src/icons/redo.png")
cut_img = PhotoImage(file="./src/icons/cut.png")
copy_img = PhotoImage(file="./src/icons/copy.png")
paste_img = PhotoImage(file="./src/icons/paste.png")
delete_img = PhotoImage(file="./src/icons/del.png")

edit_menu.add_command(label="Undo", accelerator="Ctrl+Z",
                      image=undo_img, compound=LEFT)
edit_menu.add_command(label="Redo", accelerator="Shift+Z",
                      image=redo_img, compound=LEFT)
edit_menu.add_separator()
edit_menu.add_command(label="Cut", accelerator="Ctrl+X",
                      image=cut_img, compound=LEFT)
edit_menu.add_command(label="Copy", accelerator="Shift+C",
                      image=copy_img, compound=LEFT)
edit_menu.add_command(label="Paste", accelerator="Ctrl+V",
                      image=paste_img, compound=LEFT)
edit_menu.add_command(label="Delete", accelerator="Shift+D",
                      image=delete_img, compound=LEFT, command=delete)

###### SEARCH MENU ###############
search_menu = Menu(menubar, tearoff=False)
menubar.add_cascade(label="Search", menu=search_menu)

find_img = PhotoImage(file="./src/icons/find.png")

search_menu.add_command(label="Find", accelerator="Ctrl+F",
                        image=find_img, compound=LEFT)

###### VIEW MENU ###############
view_menu = Menu(menubar, tearoff=False)
menubar.add_cascade(label="View", menu=view_menu)

wordwrap = BooleanVar()
show_toolbar = BooleanVar()
show_statusbar = BooleanVar()

view_menu.add_checkbutton(
    label="Word Wrap", variable=wordwrap, onvalue=True, offvalue=False)
edit_menu.add_separator()
view_menu.add_checkbutton(
    label="Tool Bar", variable=show_toolbar, onvalue=True, offvalue=False)
view_menu.add_checkbutton(
    label="Status Bar", variable=show_statusbar, onvalue=True, offvalue=False)

###### THEME MENU ###############
theme_menu = Menu(menubar, tearoff=False)
menubar.add_cascade(label="Themes", menu=theme_menu)

theme = StringVar()

light_img = PhotoImage(file="./src/icons/light_default.png")
light_plus_img = PhotoImage(file="./src/icons/light_plus.png")
dark_img = PhotoImage(file="./src/icons/dark.png")
blue_img = PhotoImage(file="./src/icons/blue.png")
red_img = PhotoImage(file="./src/icons/red.png")
monokai_img = PhotoImage(file="./src/icons/monokai.png")

theme_menu.add_radiobutton(label="Light Default",
                           image=light_img, variable=theme, compound=LEFT)
theme_menu.add_radiobutton(label="Light Plus",
                           image=light_plus_img, variable=theme, compound=LEFT)
theme_menu.add_radiobutton(label="Dark",
                           image=dark_img, variable=theme, compound=LEFT)
theme_menu.add_radiobutton(label="Blue",
                           image=blue_img, variable=theme, compound=LEFT)
theme_menu.add_radiobutton(label="Red",
                           image=red_img, variable=theme, compound=LEFT)
theme_menu.add_radiobutton(label="Monokai",
                           image=monokai_img, variable=theme, compound=LEFT)


###### TOOLBAR MENU ###############
toolbar = Label(app)
toolbar.pack(side=TOP, fill=X)

font_lits = sorted(font.families())
selected_font = StringVar()
font_family_combobox = Combobox(
    toolbar, width=30, values=font_lits, state='readonly', textvariable=selected_font)
font_family_combobox.current(font_lits.index('Arial'))
font_family_combobox.grid(row=0, column=0, padx=5)

selected_font_size = IntVar()
font_size_combobox = Combobox(
    toolbar, width=5, textvariable=selected_font_size, values=tuple(range(8, 81)))
font_size_combobox.current(4)
font_size_combobox.grid(row=0, column=1)

font_family_combobox.bind('<<ComboboxSelected>>', set_font_family)
font_size_combobox.bind('<<ComboboxSelected>>', set_font_size)

bold_img = PhotoImage(file="./src/icons/bold.png")
bold_button = Button(toolbar, image=bold_img, command=bold_text)
bold_button.grid(row=0, column=2, padx=5)

italic_img = PhotoImage(file="./src/icons/italic.png")
italic_button = Button(toolbar, image=italic_img, command=italic_text)
italic_button.grid(row=0, column=3)

underline_img = PhotoImage(file="./src/icons/underline.png")
underline_button = Button(toolbar, image=underline_img, command=underline_text)
underline_button.grid(row=0, column=4, padx=5)

font_color_img = PhotoImage(file="./src/icons/font_color.png")
font_color_button = Button(toolbar, image=font_color_img, command=color_text)
font_color_button.grid(row=0, column=5)

left_img = PhotoImage(file="./src/icons/left.png")
left_button = Button(toolbar, image=left_img, command=align_left)
left_button.grid(row=0, column=6, padx=5)

center_img = PhotoImage(file="./src/icons/center.png")
center_button = Button(toolbar, image=center_img, command=align_center)
center_button.grid(row=0, column=7)

right_img = PhotoImage(file="./src/icons/right.png")
right_button = Button(toolbar, image=right_img, command=align_right)
right_button.grid(row=0, column=8, padx=5)

scrollbar_y = Scrollbar(app)
scrollbar_y.pack(side=RIGHT, fill=Y)
editor = Text(app, yscrollcommand=scrollbar_y.set, font=('arial', 12))
editor.pack(fill=BOTH, expand=True)
scrollbar_y.config(command=editor.yview)

status_bar = Label(app, text="Status Bar")
status_bar.pack(side=BOTTOM)

app.mainloop()
