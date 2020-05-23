import React from 'react';
import ill_bg_todo_app from './Images/ill_bg_todo_app.svg';
import './App.css';
import classnames from 'classnames';
import Todo from './Components/Todo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addStateDislay: false,
      newContent: '',
      wrongString: false,
      todoList: [
        // {id: 1, content: 'College', isCompletion: true},
        // {id: 2, content: 'Workout', isCompletion: true},
        // {id: 3, content: 'Working on Project', isCompletion: false},
        // {id: 4, content: 'Doing Homework', isCompletion: false},
      ]
    };
    this.changeCompletion = this.changeCompletion.bind(this);
    this.onAddStateDislay = this.onAddStateDislay.bind(this);
    this.offAddStateDislay = this.offAddStateDislay.bind(this);
    this.updateTodoList = this.updateTodoList.bind(this);
    this.saveContent = this.saveContent.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  changeCompletion(item) {
    return (event) => {
      const { todoList } = this.state;
      const index = todoList.indexOf(item);
      this.setState({
        todoList: [
          ...todoList.slice(0, index),
          {id: item.id, content: item.content, isCompletion: !item.isCompletion},
          ...todoList.slice(index+1)
        ]
      })
    }
  }

  offAddStateDislay() {
    this.setState({
      addStateDislay: false
    })
  }

  onAddStateDislay() {
    this.setState({
      addStateDislay: true
    })
  }

  updateTodoList(event) {
    let content = this.state.newContent;
    content = content.trim();
    if(content.length === 0) {
      this.setState({
        wrongString: true
      })
      return;
    }
    this.setState({
      todoList: [
        ...this.state.todoList,
        {id: this.state.todoList.length+1, content: content, isCompletion: false}
      ],
      newContent: '',
      wrongString: false
    })
    this.offAddStateDislay();
  }

  saveContent(event) {
    if (event.keyCode === 13){
      this.updateTodoList();
    }
  }

  onChangeValue(event) {
    this.setState({
      newContent: event.target.value
    })
  }

  render(){
    const { todoList, newContent, wrongString } = this.state;
    const todoListYes = todoList.filter(item => !item.isCompletion);
    const todoListNo = todoList.filter(item => item.isCompletion);
    return (
      <div className="App">

        <header>
          <i className="fas fa-bars"></i>
          <div className="title">DAILIST</div>
        </header>

        <div className={classnames("screen", {'none-display': this.state.addStateDislay})}>

          <img 
          alt="Illustration" 
          className = {
            classnames('illustration', {
              'none-display': todoList.length > 0 ? true : false
            })
          }
          src={ill_bg_todo_app} />

          <div className = {classnames('todo-list', {
                            'none-display': todoList.length > 0 ? false : true
                            })
          }>

            <div className={classnames("upcoming", {'none-display': todoListYes.length === 0})}>Upcoming</div>
            {todoListYes.length > 0 && todoListYes.map(item => {
              return <Todo 
                      key={item.id} 
                      todo={item}
                      onClick={this.changeCompletion(item)}
                      />
            })}
            <div className="h-space"></div>
            <div className={classnames("upcoming", {'none-display': todoListNo.length === 0})}>Finished</div>
            {todoListNo.length > 0 && todoListNo.map(item => {
              return <Todo 
                      key={item.id} 
                      todo={item}
                      onClick={this.changeCompletion(item)}
                      />
            })}
          </div>
        </div>

        <div className={classnames('screen', {'none-display': !this.state.addStateDislay})}>
          <i 
          onClick={this.offAddStateDislay}
          className="close fas fa-times"></i>
          <div className="add-control">
            <input 
            className={classnames("add-input", {'wrong-string': wrongString})} 
            placeholder="Write somethings here . . ." 
            value={newContent}
            onChange={this.onChangeValue}
            onKeyUp={this.saveContent}
            />
            <button onClick={this.updateTodoList} className="add-button">ADD</button>
          </div>
        </div>

        <footer>
          <button onClick={this.onAddStateDislay}>
            <i className="fas fa-plus"></i>
          </button>
        </footer>

      </div>
    );
  }
}

export default App;
