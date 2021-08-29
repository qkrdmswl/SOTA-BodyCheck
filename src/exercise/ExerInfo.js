import React, { Component } from 'react';

class ExerDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,  // 토글시킬 변수를 선언하고 초기값은 edit하지 않도록 false선언
            name: '',
            weight: '',
            count:'',
            sets:'',
        };

        this.handleToggle = this.handleToggle.bind(this);   // isEdit를 토글시킬 함수 바인딩 선언
        this.handleChange = this.handleChange.bind(this);   // Edit 폼에서 입력 가능하도록 바인딩 선언
        this.handleEdit = this.handleEdit.bind(this);       // 진짜 edit하는 함수 바인딩 선언
    }

    handleToggle() {
        if (!this.state.isEdit) {   // Edit 폼에 수정할(선택할) 데이터가 보이도록 함.
            this.setState({
                name: this.props.exer.name,  // state로 선언된 name에 선택하면서 넘겨온 props의 name을 줌
                weight: this.props.exer.weight, // state로 선언된 weight 선택하면서 넘겨온 props의 weight을 줌
                count: this.props.exer.count,
                sets: this.props.exer.sets
            
            });

            
        } else {
            this.handleEdit();
        }
        this.setState({
            isEdit: !this.state.isEdit  // isEdit 변수를 토글함
        });
        console.log(this.state.isEdit);
    }

    handleChange(e) {           // edit폼에서 입력(변경) 가능하도록 함수 선언
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleEdit() {      // state를 props의 onEdit 함수로 전달만 함.
        this.props.onEdit(this.state.name, this.state.weight, this.state.count, this.state.sets);
    }

    render() {
        const details = (
            <div id="details" style={{ "padding":"10px" , "backgroundColor":"rgb(102,180,280,0.3)","border-radius":"10px","box-shadow":"5px 5px rgb(000,051,120,0.03)" }}>
                <h5>{this.props.exer.name}</h5>
                <p>{this.props.exer.weight} kg</p>
                <p>{this.props.exer.count} 회</p>
                <p>{this.props.exer.sets} 세트</p>
            
                <p>
                    <button onClick={this.handleToggle} style={{"border-radius":"5px", "background-color":"rgb(000,204,255)"}}> {/* Edit 버튼 추가, 토글 함수에 연결 */}
                        {this.state.isEdit ? 'OK' : 'Edit'}  {/* isEdit가 true이면(수정 완료) OK가 표시되도록 */}
                    </button>
                    <button onClick={this.props.onRemove} style={{"border-radius":"5px", "margin-left":"5px", "background-color":"rgb(255,051,000)", "color":"white"}}>
                        Remove</button> 
                </p>

            </div>
            
        );

        const edit = (   // edit 가능하도록 하는 폼 선언
            <div id="edit">
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <input
                        type="number"
                        name="weight"
                        placeholder="weight"
                        value={this.state.weight}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <input
                        type="number"
                        name="count"
                        placeholder="횟수"
                        value={this.state.count}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <input
                        type="number"
                        name="sets"
                        placeholder="셋트"
                        value={this.state.sets}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <button onClick={this.handleToggle} style={{"border-radius":"5px", "background-color":"rgb(000,204,255)"}}> {/* Edit 버튼 추가, 토글 함수에 연결 */}
                        {this.state.isEdit ? 'OK' : 'Edit'}  {/* isEdit가 true이면(수정 완료) OK가 표시되도록 */}
                    </button>
                    <button onClick={this.props.onRemove} style={{"border-radius":"5px", "margin-left":"5px", "background-color":"rgb(255,051,000)", "color":"white"}}>
                        Remove</button> 
                        <butotn style={{ "backgroundColor":"gray", "margin-left":"100px" ,"border-radius":"5px"}}>  X  </butotn>
                </p>

            </div>
        )
        const view = this.state.isEdit ? edit : details;   // isEdit가 true이면 edit 화면, false이면 details를 보여줄 변수(view)선언

        const blank = (<div id="blank" style={{ "visibility":"hidden" }} >안보이게 처리한곳</div>)
        
        return (
            <div id="운동정보" style={{ "padding": "30px"}}>
                {/*운동정보*/}
                {this.props.isSelected ? view : blank}  {/*선택된 상태이면 view를, 아니면 blank를 보여주도록 detail -> view로 수정*/}
            </div>
            
        );
        
    }
}

ExerDetails.defaultProps = {
    exer: {
        name: '',
        weight: '',
        count:'',
        sets:''
    },
    onRemove: () => { console.error('onRemove not defined'); },
    onEdit: () => { console.error('onEdit not defined'); }
}

export default ExerDetails;