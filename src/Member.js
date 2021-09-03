import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddMemModal} from './AddMemModal';
import {EditMemModal} from './EditMemModal';

export class Member extends Component{

    constructor(props){
        super(props);
        this.state={mems:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'member')
        .then(response=>response.json())
        .then(data=>{
            this.setState({mems:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteMem(memid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'member/'+memid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {mems, memid,memname,depmt,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>MemberId</th>
                        <th>Member Name</th>
                        <th>Department</th>
                        <th>DOJ</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mems.map(mem=>
                            <tr key={mem.MemberId}>
                                <td>{mem.MemberId}</td>
                                <td>{mem.MemberName}</td>
                                <td>{mem.Department}</td>
                                <td>{mem.DateOfJoining}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        memid:mem.MemberId,memname:mem.MemberName,depmt:mem.Department,
        photofilename:mem.PhotoFileName,doj:mem.DateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deletemem(mem.MemberId)}>
            Delete
        </Button>

        <EditMemModal show={this.state.editModalShow}
        onHide={editModalClose}
        memid={memid}
        memname={memname}
        depmt={depmt}
        photofilename={photofilename}
        doj={doj}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Member</Button>

                    <AddMemModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}