const getTextInputSnippet = (keys) => {
 let htmlSnippet = ''
    let getValueFn = ''
    let indexValues= ''
    keys.map((ele) => {
        let [key, value] = ele?.split(':')
        key = key.replace(/ /g, '');
        value = value?.replace(/ /g, '');
        let title = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase())
        htmlSnippet = htmlSnippet + `<TextInput \n   title="${title}" \n    onChange={this.onChange} \n   defaultValue={this.getLocalizedVal('${key}')} \n   ref={el => (this.${key}= el)} \n />` + '\n'
        getValueFn = getValueFn + `${key} : this?.${key}?.value` + ',\n'
        indexValues = indexValues + `${key}: ${value}` + ',\n'
    })
    let path='(moduleSettings => metadataMap)'
    return {jsx:htmlSnippet, fn: getValueFn , index: indexValues,path :path}
}


const getColorInputSnippet=(keys)=>{
    let constructorKeys = ''
    let htmlSnippet = ''
    let getValueFn = ''
    let indexValues= ''
    keys.map((ele) => {
      let [key,value]=ele?.split(':')
      key = key.replace(/ /g, '');
      value = value?.replace(/ /g, '');
      let title = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase())
      constructorKeys = constructorKeys + `this.${key} = _.get(this.props, "data.layoutSettings.settings.${key}") || ""` + ',\n'
      htmlSnippet = htmlSnippet + `<ColorInput \n   title="${title}" \n   onChange={(...args) => this.onColorChange(...args, ${key})} \n   defaultValue={_.get(settings, ${key})}  \n />` + '\n'
      getValueFn = getValueFn + `${key} : this?.${key}` + ',\n'
      indexValues = indexValues + `${key}: ${value}`  + ',\n'
    })
    let path='(layoutSettings => settings)'
    return {constructor:constructorKeys, jsx:htmlSnippet, fn: getValueFn , index: indexValues,path:path}
}


const getSwitchSnippet=(keys)=>{
    let htmlSnippet = ''
    let getValueFn = ''
    let indexValues= ''
    keys.map((ele) => {
      let [key,value]=ele?.split(':')        
      key = key.replace(/ /g, '');
      value = value?.replace(/ /g, '');
      let title = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase())
      htmlSnippet = htmlSnippet + `<Switch \n   title="${title}" \n    onChange={this.onChange} \n   defaultValue={settings?.${key}} \n   ref={el => (this.${key}= el)} \n />` + '\n'
      getValueFn = getValueFn + `${key} : this?.${key}?.value` + ',\n'
      indexValues = indexValues + `${key}: ${value == "true" ? true : false}`  + ',\n'
    })
    let path='(layoutSettings => settings)'
    return {jsx:htmlSnippet, fn: getValueFn , index: indexValues,path:path}
}


const getFontSnippet=(keys)=>{
  let htmlSnippet = 'const fontSettings = this?.props?.data?.layoutSettings?.fontSettings' + '\n' + '\n'
  let getValueFn=''
  let fontKeys=''
  keys.map((ele) => {
    let [key,value]=ele?.split(':')        
    key = key.replace(/ /g, '');
    value = value?.replace(/ /g, '');
    fontKeys= fontKeys + '{' + '\n\t' + `key:${key},` + '\n\t' + `caption:${value}` +'\n\t' + '},' +'\n\t'
  })
  htmlSnippet = htmlSnippet + `<FontSettings \n  keys={[${fontKeys}]} \n\t title="Font Settings" \n\t onChange={this.onChange} \n\t allowDelete={true} \n\t data={fontSettings || []} \n\t ref={el => (this.fontSettings= el)} \n\t />` + '\n'
  getValueFn= getValueFn +' fontSettings:this?.fontSettings?.value'
  let path='(layoutSettings)'
  return {jsx:htmlSnippet,path:path, fn:getValueFn}
}

const getSelectSnippet=(keys)=>{
  let htmlSnippet = ''
  let getValueFn=''
  let indexValues=''
  console.log(keys);
  keys.map((ele) => {
    let [key,value]=ele?.split(':')        
    key = key.replace(/ /g, '');
    value = value?.replace(/ /g, '');
    let title = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase())
    htmlSnippet = htmlSnippet + `<Select \n\t title="${title}" \n\t onChange={this.onChange} \n\t defaultValue={settings?.${key}}  \n\t options={{VALUE:CAPTION}} \n\t ref={el => (this.${key}= el)} \n />` + '\n'
    getValueFn = getValueFn + `${key} : this?.${key}?.value` + ',\n'
    indexValues = indexValues + `${key}: ${value}`  + ',\n'
  })

  let path='(layoutSettings => settings)'
  return {jsx:htmlSnippet,path:path, fn:getValueFn,index:indexValues}
}

export {getTextInputSnippet,getColorInputSnippet,getSwitchSnippet, getFontSnippet,getSelectSnippet}


