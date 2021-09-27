import React from 'react';
import * as actions from "../../actions";
import {decToBin, binToDec} from "../../utils";
import { Link } from 'react-router-dom';
import { Table, Menu, Icon, Label, Checkbox, Button, Message } from 'semantic-ui-react';
import { connect, dispatch } from "react-redux";
import {getFeatureFlags} from "../../reducers";
import Common from "./Common";



let FeatureFlags = ({fetchFeatureFlags, setFeatureFlags, featureFlags}) => {
  const [selectedFeatureFlags, setSelectedFeatureFlags] = React.useState([]);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const regions = ["Asia","Korea","Europe","Japan","America"]

  React.useEffect(() => {
      fetchFeatureFlags();
  },[]);

  React.useEffect(() => {
      transformFeatureFlags(featureFlags);
  }, [featureFlags]);

  const transformFeatureFlags = (featureFlags) => {
    let curFeatureFlags = featureFlags;
    for(let i=0; i < curFeatureFlags.length; i++){
      let binString = decToBin(curFeatureFlags[i].value);
      let binStringList = binString.split("");
      curFeatureFlags[i]["valueBinary"] = binStringList;
    }
    setSelectedFeatureFlags(curFeatureFlags);
  }

  const saveNewFeatureFlags = async () => {
    try{
      for(let i=0; i < selectedFeatureFlags.length; i++){
        await setFeatureFlags(selectedFeatureFlags[i]);
      }
      setSuccessMessage("Updated Successfully")
      closeAlert()

    }
    catch (err) {
      setErrorMessage("Oops ! Somthing went wrong ..")
      closeAlert()
    }
  }

  const resetFlags = () => {
      fetchFeatureFlags();
  }

  const closeAlert =() =>  {
    setTimeout(function(){ setErrorMessage(""); }, 2000);
    setTimeout(function(){ setSuccessMessage(""); }, 2000);
  }

  const toggleFeatureAccess = (e, row_key, column_key) => {
    let curFeatureFlags = selectedFeatureFlags.slice();
    let curFeatureFlagsRow = curFeatureFlags[row_key].valueBinary
    curFeatureFlagsRow[column_key] = curFeatureFlagsRow[column_key]  == '0' ? '1' : '0'
    curFeatureFlags[row_key].value = binToDec(curFeatureFlagsRow.join(""))
    setSelectedFeatureFlags(curFeatureFlags);
  };


  const FlagManager = () => {
  return (
      <div className="center">
        <Table>
          <Table.Header>
            <Table.Row >
              <Table.HeaderCell colSpan='6' style={{color:"White", background:"#001673"}} ><b> Feature Flag Manager </b></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell><b>Regions</b></Table.Cell>
              {regions.map((data, key) => {
                return(<Table.Cell key = {key}><b>{data}</b></Table.Cell>);
              })}
            </Table.Row>

            {selectedFeatureFlags.map((data, row_key) => {
              return (
                  <Table.Row key = {row_key} style={{textAlign:"center"}}>
                    <Table.Cell style={{textAlign:"left"}}>{data.name}</Table.Cell>
                    {data.valueBinary.map((data, column_key) => {

                      return(<Table.Cell key = {column_key}>
                                <Checkbox
                                  checked = {data == '1' ? true : false}
                                  onClick = {e => toggleFeatureAccess(e,row_key, column_key)}
                                />
                            </Table.Cell>)
                            })}
                  </Table.Row>
              );
            })}

          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='6' >
                <div style= {{float: "right"}}>
                  <Button onClick={e => resetFlags()} size= "mini" style= {{marginRight: "7px"}} content='Cancel' />
                  <Button onClick={e => saveNewFeatureFlags()} size= "mini" primary content='Save' />
                </div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <div style={{marginTop:"50px"}}>
          {errorMessage && <Message error content={errorMessage} />}
          {successMessage && <Message success content={successMessage} />}
        </div>

      </div>

    )};



  return (
    <Common Component = {<FlagManager/>}/>
  );
}

const mapStateToProps = state => ({
  featureFlags: getFeatureFlags(state),
});

FeatureFlags = connect(
  mapStateToProps,
  actions
)(FeatureFlags);

export default FeatureFlags;
