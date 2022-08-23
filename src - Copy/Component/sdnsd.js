console.clear()

const TITLE = 'ReactJS: TODO list v3.0'
const LEAD = (
  <div>
    <div>TODO list with React Hooks</div>
    <div>Tap on the bullet point to mark it done</div>
    <div>Tap on any entry to edit</div>
    <div>Press <kbd>enter</kbd> or <kbd>return</kbd> to save changes</div>
    <div>Press <kbd>esc</kbd> to cancel</div>
  </div>
)
const DEG = randInt(360)
const BG = [randColor(),randColor()]
const FLEX = false

const LIST = ['TODO list v3.0','Created and updated date','Remove all and remove done',/*'Trash bin; recycle','Auto-resize text field on editing','Sorting and re-arrange','Filter or search','Prioritization'*/]

const TODO_LIST = LIST.map(value=>({value,done:false,created:new Date()}))
TODO_LIST[0].done = true

function Todo(props) {
  const {title,list=[],onChange,className='',style={}} = props
  
  const [allowRemove,setAllowRemove] = React.useState(false)
  
  function toggle(i) {
    if (onChange) onChange([...list.slice(0,i),{...list[i],done:!list[i].done},...list.slice(i+1)])
  }
  
  function add(value) {
    if (onChange) onChange([...list,{value,done:false,created:new Date()}])
  }
  
  function remove(i) {
    if (onChange) {
      onChange([...list.slice(0,i),...list.slice(i+1)])
    }
  }
  
  function update(i,value) {
    if (onChange) {
      onChange([...list.slice(0,i),{...list[i],value},...list.slice(i+1)])
    }
  }
  
  return (
    <div className={className} style={style}>
      <div className="text-center">
        <h3>{title}</h3>
      </div>
      
      <TodoAllowRemove value={allowRemove} onChange={setAllowRemove} className="text-right mb-3" />
      
      {list.length<=0&&<div className="text-center text-muted animated slow fadeInDown"><h3 className="animated swing slower">&#x1f342;</h3><h5 className="animated swing slower">Add something</h5></div>}
      
      <ul className="list-unstyled">
        {list.map((e,i)=><TodoEntry key={i} {...e} onChange={value=>update(i,value)} onToggle={e=>toggle(i)} allowRemove={allowRemove} onRemove={e=>remove(i)} className="animated faster fadeInUp" />)}
      </ul>
      
      <TodoInput onChange={add} />
    </div>
  )
}

function TodoAllowRemove(props) {
  const {value,onChange,className=''} = props
  
  function handleChange(e) {
    //e.preventDefault()
    if (onChange) onChange(!value)
  }
  
  return (
    <div className={className}>
      <div className="custom-control custom-switch">
        <input type="checkbox" className="custom-control-input" id="allowRemove" value={value} checked={value} onChange={handleChange} />
        <label className="custom-control-label" htmlFor="allowRemove">Enable remove</label>
      </div>
    </div>
  )
}

function TodoInput(props) {
  const {onChange} = props
  
  const [value,setValue] = React.useState('')
  
  function handleSubmit(e) {
    e.preventDefault()
    
    if (!value) return
    
    if (onChange) {
      onChange(value)
      setValue('')
    }
  }
  
  function handleChange(e) {
    e.preventDefault()
    setValue(e.target.value)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label className="w-100 text-center text-secondary">What else? <span className="h3" data-tootik="Hurmmm...">&#x1f914;</span></label>
      <div className="input-group shadow-sm mb-3">
        <input type="text" className="form-control bg-light" placeholder="" value={value} onChange={handleChange} />
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="submit" style={{whiteSpace:'nowrap'}} disabled={!value}>{'\u002b'} Add</button>
        </div>
      </div>
      <small className="form-text text-muted">Simply press <kbd>enter</kbd> or <kbd>return</kbd> on done to add.</small>
    </form>
  )
}

function TodoEntry(props) {
  const {value='',done=false,created,onToggle,allowRemove=false,onRemove,onChange,onTab,className=''} = props
  
  const [isEdit,setIsEdit] = React.useState(false)
  const [cache,setCache] = React.useState(value)
  
  const input = React.useRef()
  
  React.useEffect(()=>{
    if (isEdit) {
      setCache(value)
      try {
        input.current.focus()
      } catch(error) {
        console.warn(error)
      }
    }
  }, [isEdit])
  
  function save(e) {
    e.preventDefault()
    if (!cache.trim()) {
      // cancel changes
      setIsEdit(false)
      return
    }
    if (onChange) {
      onChange(cache.trim())
    }
    setIsEdit(false)
  }
  
  function handleChange(e) {
    e.preventDefault()
    setCache(e.target.value)
  }
  
  function cancel(e) {
    e.preventDefault()
    setTimeout(()=>{
      setCache(value)
      setIsEdit(false)
    }, 50)
  }
  
  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      save(e)
    }
    if (e.keyCode === 27) {
      cancel(e)
    }
  }
  
  return (
    <li className={`media mb-2 ${className}`}>
      <div className="mr-3 media-head">
        <Checkmark value={done} onChange={onToggle} className="h4" style={{lineHeight:1,width:45,height:45}} />
      </div>
      <div className="media-body">
        {isEdit?(
          <div className="input-group">
            <input ref={input} className="form-control shadow-sm bg-light" value={cache} onChange={handleChange} onBlur={cancel} onKeyDown={handleKeyDown} autofocus />
            {cache!==value&&<div className="input-group-append">
              <button className="btn btn-outline-success shadow-sm animated faster lightSpeedIn" onClick={save} disabled={!cache}>Save</button>
              <button className="btn btn-outline-danger shadow-sm animated faster lightSpeedIn" style={{animationDelay:`.1s`}} onClick={cancel} disabled={cache===value}>Cancel</button>
            </div>}
          </div>
        ):(
          <h5 className={`mt-2 mb-1 ${done?'text-muted font-weight-lighter':''}`} style={done?{textDecoration:'line-through'}:{}} onClick={e=>setIsEdit(true)}>{value}</h5>
        )}
      </div>
      {allowRemove&&!isEdit&&<div className="media-foot">
        <div className="btn-toolbar animated faster lightSpeedIn" role="toolbar">
          <button className="btn btn-outline-danger btn-sm shadow-sm rounded-pill" style={{whiteSpace:'nowrap'}} onClick={onRemove}>{'\u{2718}'} Remove</button>
        </div>
      </div>}
    </li>
  )
}

function App() {
  const {width,height} = useDimension()
  
  const [list,setList] = React.useState(TODO_LIST)
  
  return (
    <FlexContainer deg={DEG} bg={BG} flex={FLEX}>
      <div className="container">
        <div className="h3 pt-3 text-center text-white text-shadow">{TITLE}</div>
        <p className="text-center text-light text-shadow">{LEAD}</p>
        
        <Section mb="5">
          <Todo title="My TODO List" list={list} onChange={list=>setList(list)} />
        </Section>
        
        <More />
        
      </div>
    </FlexContainer>
  )
}

function Checkmark(props) {
  const {value,onChange,className='',style={}} = props
  
  const classNames = ['Checkmark rounded-pill',className]
  const styles = {...style,background:'none',border:'none',outline:'none'}
  
  if (value) {
    styles.color = 'limegreen'
  }
  
  function toggle(e) {
    e.preventDefault()
    if (onChange) onChange(!value)
  }
  
  return (
    <button className={classNames.join(' ')} style={styles} onClick={toggle}>
      {value?<div className="animated jackInTheBox faster">{'\u2713'}</div>:<div className="animated zoomIn faster">{'\u25cb'}</div>}
    </button>
  )
}

const ICON_STYLE = {lineHeight:1,verticalAlign:'text-top'}

function Icon(props) {
  const {react=false,angular=false,vue=false,checkmark=false,height=20,className=''} = props
  
  if (react) return <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt="" height={height} className={className} style={ICON_STYLE} />
  
  if (angular) return <img src="https://angular.io/assets/images/logos/angular/shield-large.svg" alt="" height={height} className={className} style={ICON_STYLE} />
  
  if (vue) return <img src="https://vuejs.org/images/logo.png" alt="" height={height} className={className} style={ICON_STYLE} />
  
  if (checkmark) return <span className="h5 mr-2" style={{color:'limegreen'}}>{'\u2713'}</span>
  
  return null
}

const MORE_LINKS = [
  {label:'React TODO list version 2.0',url:'https://codepen.io/mjunaidi/pen/MZKZOZ',icon:'react'},
  {label:'React TODO list version 1.0',url:'https://codepen.io/mjunaidi/pen/KvjOzN',icon:'react'},
  {label:'Angular TODO list',url:'https://codepen.io/mjunaidi/pen/VOpzga',icon:'angular'},
  {label:'Vue TODO list',url:'https://codepen.io/mjunaidi/pen/qLBjXa',icon:'vue'},
  {label:'Checkmark React Component',url:'https://codepen.io/mjunaidi/pen/dyoNJRv',icon:'checkmark'},
]

function More(props)  {
  return (
    <div className="p-3 w-100 bg-white rounded text-center">
      <h3 className="text-secondary">More</h3>
      
      <ul className="list-unstyled">
        {MORE_LINKS.map(({url,label,icon},i)=>{
          const iconProps = {[icon]:true}
          return (
            <li data-tootik="Open Link in New Tab" data-tootik-conf="delay">
              <a href={url} target="_blank" rel="noreferrer noopener"><Icon {...iconProps} className="mr-2" />{label}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function FlexContainer(props) {
  const {children,deg=randInt(360),bg,style={},flex=true} = props
  const classNames = ['align-content-center align-items-center justify-content-center flex-wrap w-100 v-100 vh-100']
  if (Array.isArray(bg)&&bg.length>0) {
    style.background = `linear-gradient(${deg}deg,${bg.join(',')})`
  }
  if (flex) classNames.push('d-flex')
  return (
    <div className={classNames.join(' ')} style={style}>{children}</div>
  )
}

function TableEditor(props) {
  const {value,onChange,className=''} = props
  const classNames = ['table-sm',className]
  function handleChange(e,i,j) {
    let v = e.target.value
    if (typeof(v)==='string'&&v.length>0&&v.charAt(v.length-1)!=='.') {
      const n = Number(v)
      if (typeof(n)==='number'&&!isNaN(n)) {
        v = n
      }
    }
    onChange([...value.slice(0,i),[...value[i].slice(0,j),v,...value[i].slice(j+1)],...value.slice(i+1)],i,j)
  }
  function render(e,i,j) {
    return (
      <input value={e} className="form-control" onChange={e=>handleChange(e,i,j)} />
    )
  }
  return (
    <Table value={value} render={render} className={classNames.join(' ')} />
  )
}

function Table(props) {
  const {value,className='',render} = props
  if (Array.isArray(value)&&value.length>0) {
    const classNames = ['table',className]
    return (
      <table className={classNames.join(' ')}>
        <tbody>
          {value.map((e,i)=>{
            if (typeof(e)==='object'&&e!==null) {
              return (
                <tr key={i}>
                  {Object.keys(e).map((k,j)=>{
                    const v = e[k]
                    function renderValue() {
                      if (typeof(render)==='function') return render(v,i,j)
                      return v
                    }
                    return (
                      <td key={j}>{renderValue()}</td>
                    )
                  })}
                </tr>
              )
            }
            return null
          })}
        </tbody>
      </table>
    )
  }
  return null
}

function Details(props) {
  const {summary='details',children,className=''} = props
  return (
    <details className={className}><summary>{summary}</summary><div className="mt-3 animated faster slideInDown">{children}</div></details>
  )
}

function PreCode(props) {
  const {ugly,className='',children} = props
  
  if (typeof(children)==='object'&&children!==null) {
    if (ugly) {
      return (
        <PreCode {...props}>{JSON.stringify(children)}</PreCode>
      )
    }
    return (
      <PreCode {...props}>{JSON.stringify(children,null,2)}</PreCode>
    )
  }
  
  return (
    <pre className={`p-3 bg-dark text-white rounded shadow ${className}`}><code>{children}</code></pre>
  )
}

function randInt(n=10) {
  return Math.floor(Math.random()*n)
}

function randColor() {
  return `#${[...Array(3).keys()].map(e=>(randInt(238)+17).toString(16)).join('')}`
}

function toNumber(n,d=-1) {
  if (typeof(n)==='number'&&!isNaN(n)) return n
  if (typeof(n)==='string'&&n.length>0) {
    if (n.indexOf('.')>=0) return toNumber(parseFloat(n),d)
    else return toNumber(parseInt(n),d)
  }
  if (Array.isArray(n)&&n.length>0) return toNumber(n[0],d)
  if (typeof(n)==='object'&&n!==null) {
    const keys = Object.keys(n)
    if (Array.isArray(keys)&&keys.length>0) return toNumber(n[keys[0]],d)
  }
  if (typeof(d)==='number'&&!isNaN(d)) return d
  return -1
}

function lipsum(n=10,dot=false) {
  if (typeof(n)!=='number'||(typeof(n)==='number'&&n<1)) n=10
  const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'vivamus', 'et', 'accumsan', 'augue', 'duis', 'eget', 'nunc', 'id', 'sodales', 'finibus', 'vestibulum', 'sagittis', 'magna', 'nec', 'rutrum', 'volutpat', 'risus', 'tincidunt', 'justo', 'non', 'gravida', 'tortor', 'enim', 'in', 'urna', 'ut', 'vel', 'metus', 'pellentesque', 'porttitor', 'vitae', 'nisi', 'nullam', 'faucibus', 'condimentum', 'quam', 'imperdiet', 'class', 'aptent', 'taciti', 'sociosqu', 'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra', 'inceptos', 'himenaeos', 'interdum', 'malesuada', 'fames', 'ac', 'ante', 'primis', 'curabitur', 'nibh', 'quis', 'iaculis', 'cras', 'mollis', 'eu', 'congue', 'leo']
  const count = n
  const sentence = []
  const indexes = (new Array(count)).fill(0).map(index=>Math.floor(Math.random()*words.length))
  indexes.forEach((index,i)=>{
    const word = words[index]
    if (i===0)
      sentence.push(word.charAt(0).toUpperCase()+word.substr(1))
    else
      sentence.push(word)
  })
  if (dot) return sentence.join(' ').concat('.')
  return sentence.join(' ')
}

function getDimension() {
  if (typeof(window)==='object') {
    const {innerWidth,innerHeight} = window
    return {width:innerWidth,height:innerHeight}
  }
  return {}
}

function useDimension() {
  const [dimension,setDimension] = React.useState(getDimension())
  React.useEffect(()=>{
    function handleResize() {
      setDimension(getDimension())
    }
    window.addEventListener('resize', handleResize)
    return ()=>window.removeEventListener('resize', handleResize)
  }, [])
  return dimension
}

// usage <Row noGutters>...</Row>
// <Row noGutters><Col></Col><Col></Col></Row>
function Row(props) {
  const {className='',noGutters=false,children} = props
  const classNames = [className,'row']
  if (noGutters) classNames.push('no-gutters')
  return (
    <div className={classNames.join(' ')}>{children}</div>
  )
}

// usage <Col>...</Col>
// <Col n={12} sm={8} md={6} lg={4} xl={2} />
function Col(props) {
  const {className='',children,n,sm,md,lg,xl} = props
  const classNames = [className]
  
  if (typeof(n)==='number'&&n>0&&n<=12) classNames.push(`col-${n}`)
  
  // Extra small <576px	Small ≥576px	Medium ≥768px	Large ≥992px	Extra large ≥1200px
  // Max container width	None (auto)	540px	720px	960px	1140px
  // Class prefix	.col-	.col-sm-	.col-md-	.col-lg-	.col-xl-
  
  if (typeof(sm)==='number'&&sm>0&&sm<=12) classNames.push(`col-sm-${sm}`)
  if (typeof(md)==='number'&&md>0&&md<=12) classNames.push(`col-md-${md}`)
  if (typeof(lg)==='number'&&lg>0&&lg<=12) classNames.push(`col-lg-${lg}`)
  if (typeof(xl)==='number'&&xl>0&&xl<=12) classNames.push(`col-xl-${xl}`)
  
  if (classNames.length<2) classNames.push('col')
  
  return (
    <div className={classNames.join(' ')}>{children}</div>
  )
}

// usage <Box random />
// <Box backgroundColor={randColor()} />
function Box(props) {
  const {className='',children,style={minHeight:50},backgroundColor,random=false} = props
  
  const classNames = [className, 'w-100 d-flex justify-content-center align-items-center']
  
  if (typeof(backgroundColor)==='string'&&backgroundColor.length>0) style.backgroundColor = backgroundColor
  
  if (random) style.backgroundColor = randColor()
  
  return (
    <div className={classNames.join(' ')} style={style}>{children}</div>
  )
}

function Section(props) {
  const {children,className='',center=false} = props
  const classNames = ['p-3 bg-white rounded shadow',className]
  if (center) classNames.push('text-center')
  
  const mb = toNumber(props.mb,3)
  if (typeof(mb)==='number'&&mb>=0&&mb<=5) classNames.push(`mb-${mb}`)
  
  return (
    <div className={classNames.join(' ')}>{children}</div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);