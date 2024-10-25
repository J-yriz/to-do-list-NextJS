interface IProsps {
  text: string
}

const Tag = (props: IProsps) => {
  const text = props.text
  return (
    <div className='bg-gray-800 text-white px-3 text-xs py-1 rounded'>{text}</div>
  )
}

export default Tag