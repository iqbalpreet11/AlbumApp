import React, { useEffect, useState } from 'react'


const App = () => {
  //this arr state is to store data of all the albums and then next inputdata state is to get values from inputFields
  const[arr,setArr]=useState([])
  const[inputdata,setInputdata]=useState({title:'',userId:''})

  const[index,setIndex]= useState();
  //bolin state is use to toggle between add and update button
  const[bolin,setBolin]=useState(false)
  let {title,id}=inputdata;

//here we caled the getAlbums function in use-effect
  useEffect(()=>{
    getAlbums()
},[])

//here is the function for fetching & loading the api data in our table
function getAlbums(){
  fetch("https://jsonplaceholder.typicode.com/albums").then((result)=>{
    result.json().then((resp)=>{
      setArr(resp)
    })
  })
} 

//here we are targeting value property of inputs and calling them in onClick
  function data(e){
    setInputdata({...inputdata,[e.target.name]:e.target.value})
  }

  //here we are adding our data from fields in our main data array(api data + our newely added data)
 
  function addinputdata(){
 if(title==="" && id===""){
  alert("Cannot Add Empty fields")
 }else{
    setArr([...arr,{title,id}])
   
    setInputdata({name:"",id:""})
  }
}
  //function logic for deleting data 
  const deleteData = (i) =>{
     console.log(i,'deleted one');
     let total=[...arr]
     total.splice(i,1)
     setArr(total)
  } 

  //function logic for updating data 
  const UpdateData= (i) =>{
    let {title,id}=arr[i] //this particular index no row should be updated
    setInputdata({title,id})
    setBolin(true)
    setIndex(i)
  }

  //know add data at particular index means update it on that index
  const updateNewInfo = () =>{
    let total=[...arr]
    total.splice(index,1,{title,id})
    setArr(total)
    setBolin(false)
    setInputdata({name:"",id:""})
  
  }
  return (
    <div className='flex justify-center bg-gray-50' >
    <div className=' bg-slate-200 w-max shadow-md px-12 '>
    <h1 className=" flex-col  text-4xl mx-64 my-6 font-mono font-bold">Album List App</h1>
    <div className='flex justify-around mx-26 bg-slate-100  h-10 w-max'>
      <input className='border-2 rounded-sm w-64 border-gray-300' type='text' 
      value={inputdata.title || ''} 
      name='title' autoComplete='off'
      placeholder='Enter name'
      onChange={data} />
      &nbsp; &nbsp;
<input className='border-2 w-64 rounded-sm border-gray-300'  type='number' 
      value={inputdata.id || ''} 
      name='id' autoComplete='off'
      placeholder='Enter Id'
      onChange={data} /> &nbsp; 

      <button className='border-2 text-white bg-gray-600 border-gray-600 shadow-md rounded-md px-2 font-semibold hover:bg-gray-500'  onClick={!bolin?addinputdata:updateNewInfo}>{!bolin?`Add Data`:`UpdateData`}</button></div>
      <br />
      <table border='1' width='80%' >
        <tbody >
          <tr className='text-lg  font-mono font-bold bg-slate-300 ' >
           <td>Sr No</td>
            <td> Album Name&nbsp;</td>
            <td >userId&nbsp;</td>
            <td>Update &nbsp;</td>
            <td>Delete &nbsp;</td>
          </tr>
          {
        arr && arr.map (
          (item,i)=>{
            return(
              <tr   key={i} className='bg-slate-400 '>
              <td>{i+1}</td>
                <td>{item.title}</td>
                <td>{item.id}</td>
                <td><button className='border-2 text-white  border-yellow-500 bg-yellow-500 shadow-md font-semibold rounded-md py-2 px-4 hover:bg-yellow-400'  onClick={()=>UpdateData(i)}>Update</button></td>
                <td><button className='border-2 text-white  font-semibold border-red-700 bg-red-600 rounded-md shadow-md px-4 py-2 hover:bg-red-500'  onClick={()=>deleteData(i)}>Delete</button></td>
              </tr>
            )
          }
        )   
          }
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default App

