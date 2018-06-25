
function TaskCompletedButton(props) {
  return (

    <button onClick={props.onClick} value={props.values}>Complete Task</button>
  );
}
function TaskDeletedButton(props) {
  return (

    <button onClick={props.onClick} value={props.values}>Delete Task</button>
  );
}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
    this.HandleTaskCompletedButton = this.HandleTaskCompletedButton.bind(this);
    this.HandleTaskDeletedButton = this.HandleTaskDeletedButton.bind(this);
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/task/?format=json?limit=0")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.objects
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  HandleTaskCompletedButton(event) {
        fetch('http://127.0.0.1:8000/api/task/' + event.target.value + '/', {method: 'put',
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify(
              {
                  'is_completed':true,
                  'completed_at': new Date()
              }
              ),
      }).then(this.componentDidMount());


  }
  HandleTaskDeletedButton(event) {
      fetch('http://127.0.0.1:8000/api/task/' + event.target.value + '/', {method: 'delete',
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
      }).then(this.componentDidMount());

  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (!isLoaded) {
        this.componentDidMount();
    }

      return (
          <table id='myTable'>
              <tr>
                  <th>description</th>
                  <th>created_at</th>
                  <th>is_completed</th>
                  <th>completed_at</th>
                  <th>actions</th>

              </tr>

              {items.map(item => (
                      <tr>
                          <td key={item.name}>{item.description}</td>
                          <td key={item.name}>{item.created_at}</td>
                          <td >{item.is_completed && ('Completed')}{!item.is_completed && ('Waiting')}</td>
                          <td key={item.name}>{item.completed_at}</td>
                          <td>
                              {!item.is_completed && (<TaskCompletedButton onClick={this.HandleTaskCompletedButton} values={item.id} />)}
                              <TaskDeletedButton onClick={this.HandleTaskDeletedButton} values={item.id} />

                          </td>
                      </tr>

                  )
              )}


          </table>
      );
    }

}
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myComponent = ReactDOM.render(<MyComponent />, document.getElementById("all_tasks"));
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {

    event.preventDefault();
    if (!(this.state.value.length>50)){
    fetch('http://127.0.0.1:8000/api/task/', {
        method: 'POST',

        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({'description':this.state.value}),

    }).then(this.myComponent.setState({isLoaded: false}));
    }else {alert('You have exceeded the maximum number of 50 characters in this field')}



  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Description:
          <input class='form-control' type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input class='btn btn-primary' type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
    <MyForm />,
    document.getElementById("form")
);


