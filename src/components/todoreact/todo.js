import React, { useState, useEffect } from 'react'
import "./style.css"


//get the localStorage data back:
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}
const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setisEditItem] = useState("");
    const [toggleButton, settoggleButton] = useState(false);

    // add the items function:
    const addItem = () => {
        if (!inputdata) {
            alert("Please fill the data");
        } else if (inputdata && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputdata };
                    }
                    return curElem;
                })
            )

            setInputData("");
            setisEditItem(null);
            settoggleButton(false);

        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    }

    //how to edit item:
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        })

        setInputData(item_todo_edited.name);
        setisEditItem(index);
        settoggleButton(true);
    }

    //how to delete item section:
    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index;
        })
        setItems(updatedItem);
    };

    // remove all the elements:
    const removeAll = () => {
        setItems([]);
    }

    //adding localStorage:
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add your list here✌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" className="form-control" placeholder="✍ Add Item" value={inputdata} onChange={(event) => setInputData(event.target.value)} />
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-solid fa-plus" onClick={addItem}></i>
                        )}
                    </div>
                    {/* show our items */}
                    <div className="showItems">
                        {items.map((curElem, index) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* remove all button */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo