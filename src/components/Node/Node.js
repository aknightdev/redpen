import React from 'react';
export default class Node extends React.Component {
	render() {
    	const { label, children, isRoot, nodeIdx, chCnt } = this.props;
    	var nodes;
    	if (children) {
    		let level = this.props.level + 1;
    		nodes = children && children.map((item, index) => <Node level={level} chCnt={children && children.length} nodeIdx={index} isRoot={false} isLast={(index+1)===children && children.length} key={index} {...item} />);
    	}
    	const isSingle = nodeIdx===0 && chCnt===1;
    	return (
	    	<li className= {`tree-leaf ${nodeIdx===0 && !isSingle?"first" : ""} ${isRoot?"root":''} ${(nodeIdx+1)===chCnt && !isSingle?"last":""} ${isSingle && !isRoot?"single":""} ${this.props.level>1?"subchilds":""}`} data-parent={nodeIdx}>
	        	<div className="tree-node">
				  <div className="page-drop-target tbefore" style={{display: 'block'}}><div className="drop-box"></div></div>
				  <div className={`page ${isRoot?"page-root":""} ${!children?"nochilds":""}`} data-w="140" style={{backgroundColor: 'rgb(255, 255, 255)', width: '130px'}}>
				  	<textarea className="page-ta dis" defaultValue={label} maxLength="250" style={{visibility: 'visible', color: 'rgb(0, 0, 0)', fontSize: '100%', lineHeight: 'normal', height: '18px', fontWeight: 'normal', fontStyle: 'normal'}}></textarea>
				    <div className="opt-ic" style={{display: 'none'}}>
				      
				    </div>
				    <div className="cps-ic" style={{display: 'none'}}>
				      <i className="fa fa-ic fa-caret-down tooltip-e" data-act="children" aria-hidden="true" style={{}} data-t1="Hide Chidren (↑)" data-t2="Show Children (↓)" original-title="Hide Children (↑)"></i>
				    </div>
				  </div>
				  <div className="ntm2 _nm hide" style={{marginLeft: '55px', display: 'none'}}></div>
				  <div className="ntm _nm hide" style={{marginLeft: '50px', display: 'none'}}></div>
				  <div className="page-drop-target tafter"><div className="drop-box"></div></div>
				  <div className="aicon bc hide" style={{display: 'none'}}>
				    <div className="ic-hldb"><i className="fa fa-plus-circle green ic-add ic-pg tooltip-s" data-act="add" aria-hidden="true" original-title="Add sub page"></i></div>
				  </div>
				</div>
	      		<ul className={`tree-children ${"level"+this.props.level}`}>{nodes}</ul>
	    	</li>
    	)
  }
}