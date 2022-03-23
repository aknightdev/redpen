import React from 'react';
import { SketchPicker } from 'react-color';
import Select from 'react-select';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {textColor:this.props.nodeAttr.textColor, bgColor:this.props.nodeAttr.bgColor, displayColorPicker: false, displayBgColorPicker: false, options:[{value: '90%', label:'90%'},{value: '100%', label:'100%'},{value: '120%', label:'120%'},{value: '140%', label:'140%'},{value: '160%', label:'160%'}], fontSize:this.props.nodeAttr.fontSize, bold: this.props.nodeAttr.bold, italic: this.props.nodeAttr.italic, note: this.props.nodeAttr.note };
    this.onDrag = this.onDrag.bind(this);
    this.onBgDrag = this.onBgDrag.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleBgClick = this.handleBgClick.bind(this);
    this.handleBgClose = this.handleBgClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.toggleBold = this.toggleBold.bind(this);
    this.toggleItalic = this.toggleItalic.bind(this);
  }
  toggleBold(){
    this.setState({ bold: !this.state.bold });
    this.updateParent();
  }
  toggleItalic(){
    this.setState({ italic: !this.state.italic });
    this.updateParent();
  }
  handleChange = selectedOption => {
    this.setState({ fontSize: selectedOption });
    this.updateParent();
  }
  handleNoteChange = (event) => {
    this.setState({ note: event.target.value });
    this.updateParent();
  }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };
  handleBgClick = () => {
    this.setState({ displayBgColorPicker: !this.state.displayBgColorPicker });
  };
  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };
  handleBgClose = () => {
    this.setState({ displayBgColorPicker: false });
  };
  onDrag(color, event) {
    this.setState({textColor:color.hex});
    this.updateParent();
  }
  onBgDrag(color, event) {
    this.setState({bgColor:color.hex});
    this.updateParent();
  }
  updateParent(){
    this.props.updateNodeattr({textColor:this.state.textColor,bgColor:this.state.bgColor, fontSize:this.state.fontSize, bold: this.state.bold, italic: this.state.italic, note: this.state.note});
  }
  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
    <div id="sidebar" className="sidebar">
      
      <div className="z-200">
        <div className="properties-panel" style={{opacity: "1", transitionTimingFunction: "cubic-bezier(1, 0, 0, 1)", transitionDuration: "500ms", transform: "scale(1)", top: "80px", left: "47px"}}>
          <div className="panel-header">
            <button onClick={this.props.closeSidebarFn}><i className="fa fa-times btn-close" aria-hidden="true"></i></button>
            <div className="panel-label"><i className="fa fa-cog  " aria-hidden="true" original-title="Properties"></i> PROPERTIES</div>
            <div className="clear"></div>
          </div>
          <div className="panel-body">
            <div className="inspector-empty hide">
              No box selected. 
            </div>
            <div className="inspector-props">
              <div className="panel-row">
                <div className="panel-c1">
                  Background
                </div>
                <div className="panel-c2">
                  <div className="minicolors minicolors-theme-default minicolors-position-right">
                    <input type="text" id="txtc" onClick={ this.handleBgClick } className="color-picker minicolors-input"  value={this.state.bgColor} readOnly={true} size="7" />
                    <span className="minicolors-swatch minicolors-sprite minicolors-input-swatch" style={{backgroundColor:this.state.bgColor}}>
                      <span className="minicolors-swatch-color"></span>
                    </span>
                    { this.state.displayBgColorPicker ? <div style={ popover }>
                    <div style={ cover } onClick={ this.handleBgClose }/>
                    <SketchPicker color={ this.state.bgColor } onChangeComplete={ this.onBgDrag } />
                    </div> : null }
                  </div>
                </div>
              </div>
              <div className="panel-row">
                <div className="panel-c1">
                  <span>Text</span>
                </div>
                <div className="panel-c2">
                  <div className="minicolors minicolors-theme-default minicolors-position-right">
                    <input type="text" id="txtc1" onClick={ this.handleClick } className="color-picker minicolors-input" value={this.state.textColor} readOnly={true} size="7" />
                    <span className="minicolors-swatch minicolors-sprite minicolors-input-swatch" style={{backgroundColor:this.state.textColor}}>
                      <span className="minicolors-swatch-color"></span>
                    </span>
                    { this.state.displayColorPicker ? <div style={ popover }>
                    <div style={ cover } onClick={ this.handleClose }/>
                    <SketchPicker color={ this.state.textColor } onChangeComplete={ this.onDrag } />
                    </div> : null }
                  </div>
                </div>
              </div>
              <div className="panel-row mg0">
                <div className="panel-c1">
                  Font Size
                </div>
                <div className="panel-c2">
                  <Select value={this.state.fontSize} onChange={this.handleChange} options={this.state.options} />
                </div>
                <div className="panel-c2">
                  <div onClick={this.toggleBold} className= {`font-prop _pbold ${this.state.bold?"active" : ""}`} data-t="p5" style={{marginLeft:"8px"}}>
                    <i className="fa fa-bold" aria-hidden="true"></i>
                  </div>
                  <div onClick={this.toggleItalic} className={`font-prop _pitalic ${this.state.italic?"active" : ""}`} data-t="p6">
                    <i className="fa fa-italic" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="clear"></div>
              </div>
            </div>
          </div>
          <div className="panel-note" style={{padding:"0"}}>
            <textarea value={this.state.note} onChange={this.handleNoteChange} id="prop-note" placeholder="Type your note here" tabIndex="5000" style={{outline: "none"}}></textarea>
          </div>
        </div>
      </div>
    </div>
    );
  }
}