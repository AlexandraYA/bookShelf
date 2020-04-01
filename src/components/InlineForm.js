import React from 'react'


const InlineForm = props => {

  const cls = ["btn"]
  const btnClass = props.btn && props.btn.class ? props.btn.class : "btn-outline-primary"
  cls.push(btnClass)

  const onSubmitHandler = event => {
    event.preventDefault()
  }

  const renderSelect = () => (
    <select
      className="custom-select"
      defaultValue={props.select.options[0].value}
      onChange={props.select.onChange}
    >
      { props.select.options.map((option, index) => {
        return (
          <option
            key={option.value + option.index}
            value={option.value}>
            {option.text}
          </option>
        )
      })}
    </select>
  )

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="input-group mb-3">

        { props.wrappedSelect
          ? (
            <div className="input-group-prepend">
              { renderSelect() }
            </div>
          )
          : renderSelect()
        }

        { props.input.onChange
          ? <input
            type="text"
            className="form-control"
            onChange={props.input.onChange}
            value={props.input.value}
            placeholder={props.input.placeholder} />
          : null
        }

        <div className="input-group-append">
          <button
            className={cls.join(" ")}
            disabled={props.btn.disabled}
            onClick={props.btn.onClick}
          >
            {props.btn.text}
          </button>
        </div>
      </div>
    </form>
  )
}

export default InlineForm