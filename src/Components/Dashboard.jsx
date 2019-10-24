import React, { Component } from 'react';

import { Form, Select, Button, Divider, Input } from 'semantic-ui-react'
import TableComponent from './BaseComponents/TableComponent';
import ExportCSV from '../Services/ExcelExport'
import Http from '../Services/Http';

const dataformat = (data) => {
    let custs = []
    data.map(item=>{
        custs.push({Constant: item.constantValues, Functions: item.functionS,
        Source: item.sourceFields, Target: item.targetField});
    })
    return custs;
  }
const stateOptions =[1,2,3].map((state, index) => ({
    key: state,
    text: state,
    value: state,
  }))

const generateOptions = (options)=>{
    let data = [];
    options.map((option, index) => {
        console.log(option)
        data.push({
            key: option.iD,
            text: option.name,
            value:option.iD,
        })
      })
    return data;
}
class Dashboard extends Component{
    state = {
        integrationPackets:[],
        integrationFlow:[],
        messageMappings:[],
        mappingResults:[],
        isIntialLoading:false,
        isiFlowLoading: false,
        isMessageMappingLoading:false,
        selectedIntegrationPacket:null,
        messageMappingLoading:false,
        selectedIntegrationFlow: null,
        selectedMessageMapping: null,
        fileName:"Default"
    }
    componentDidMount(){
        this.setState({
            isIntialLoading:true
        })
        Http.get('https://p318236trial-trial.apim1.hanatrial.ondemand.com/p318236trial/cpi/tools/iPackage')
        .then((response)=>{
            if(response && response.data && response.data.IntegrationPackage){
                let integrationPackets = [...response.data.IntegrationPackage]
                this.setState({
                    integrationPackets:[...integrationPackets],
                    isIntialLoading:false
                })
            }
        })
    }

    getIFlow=(id)=>{
         this.setState({
            isiFlowLoading: true
         })
         Http.get(`https://p318236trial-trial.apim1.hanatrial.ondemand.com/p318236trial/cpi/tools/iFlows?id=${id}`)
         .then((res)=>{
             let options = []
             this.setState({
                isiFlowLoading: false,
                integrationFlow: (res.data && res.data.IntegrationFlow) || []
             })
         })
    }

    getMessageMapping=(id)=>{
        this.setState({
            isMessageMappingLoading: true
        })
        Http.get(`https://p318236trial-trial.apim1.hanatrial.ondemand.com/p318236trial/cpi/tools/iMaps?id=${id}`)
        .then((res)=>{
            let options = []
            this.setState({
                isMessageMappingLoading: false,
               messageMappings: (res.data && res.data.IntegrationMaps) || []
            })
        })
   }

   getTableData=(id)=>{
    this.setState({
        isMessageMappingLoading: true
    })
    Http.get(`https://p318236trial-trial.apim1.hanatrial.ondemand.com/p318236trial/cpi/tools/mappingData?id=${id}`)
    .then((res)=>{
        let options = []
        res.data && res.data.mappingResult.map(item=>{
            options.push({
                constantValues: item.constantValues || "-",
                functionS: item.functionS || "-",
                sourceFields: item.sourceFields || "-",
                targetField: item.targetField || "-",
            })
        })
        this.setState({
            isMessageMappingLoading: false,
            mappingResults: options || []
        })
    })
}

    render(){
        return(
            <div>
            <div>
            <Form>
                <div style={{display: "flex",flexFlow:'wrap', width: "50%"}}>
                    <div style={{flex: "1 0 50%", padding: 16}}> 
                        <Form.Select
                            value={this.state.selectedIntegrationPacket}
                            label={<label style={{textAlign:"left"}}>Integration Package</label>}
                            options={generateOptions(this.state.integrationPackets)}
                            loading={this.state.isIntialLoading}
                            onChange={(e, option)=>{
                                this.setState({
                                    selectedIntegrationPacket: option.value
                                },()=>{
                                    this.getIFlow(option.value)
                                })
                            }}
                            placeholder='Select'
                        />
                    </div>
                    <div style={{flex: "1 0 50%", padding: 16}}> 
                        <Form.Field
                            control={Select}
                            label={<label style={{textAlign:"left"}}>iFlow</label>}
                            options={generateOptions(this.state.integrationFlow)}
                            placeholder='Select'
                            value={this.state.selectedIntegrationFlow}
                            loading={this.state.isiFlowLoading}
                            onChange={(e, option)=>{
                                this.setState({
                                    selectedIntegrationFlow: option.value
                                },()=>{
                                    this.getMessageMapping(option.value)
                                })
                            }}
                        />
                    </div>
                </div>
                <div style={{display: "flex",flexFlow:'wrap', width: "50%"}}>
                    <div style={{flex: "1 0 50%", padding: 16}}> 
                        <Form.Field
                            control={Select}
                            label={<label style={{textAlign:"left"}}>Message Mappings</label>}
                            options={generateOptions(this.state.messageMappings)}
                            loading={this.state.isMessageMappingLoading}
                            placeholder='Select'
                            value={this.state.selectedMessageMapping}
                            onChange={(e, option)=>{
                                this.setState({
                                    selectedMessageMapping: option.value,
                                    fileName: option.value
                                },()=>{
                                    this.getTableData(option.value)
                                })
                            }}
                        />
                    </div>
                    <div style={{flex: "1 0 50%", padding: 16}}> 
                        {/* <Form.Field
                            control={Select}
                            label={<label style={{textAlign:"left"}}>State</label>}
                            options={stateOptions}
                            placeholder='State'
                        /> */}
                    </div>
                </div>
                </Form>
            </div>
            
            <div style={{padding: 16, width: "70%"}}>
                
                  <Divider />
                  
                <div>
                { this.state.mappingResults && this.state.mappingResults.length > 0&&
                    <React.Fragment>
                        <p>File Name: </p>
                        <Input value={this.state.fileName} onChange={(e)=>{
                            this.setState({
                                fileName: e.target.value
                            })
                        }}/>
                        <ExportCSV csvData={dataformat(this.state.mappingResults)} fileName={this.state.fileName} />
                    </React.Fragment>
                }
                </div>
                <div>
                    <TableComponent tableData={this.state.mappingResults}/>
                </div>

            </div>
            </div>
        );
    }
}

export default Dashboard;
