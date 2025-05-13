export function transDocsJson(typedocSidebar: any) {
  const keysList = ['Reference', 'Project', 'Module', 'Namespace', 'Enum', 'EnumMember', 'Class', 'Interface', 'TypeAlias', 'Constructor', 'Property', 'Variable', 'Function', 'Accessor', 'Method', 'Parameter', 'TypeParameter', 'TypeLiteral', 'CallSignature', 'ConstructorSignature', 'IndexSignature', 'GetSignature', 'SetSignature']
  return typedocSidebar.map((element: any) => {
    const updatedElement = {
      ...element,
      text: element.text?.charAt(0).toUpperCase() + element.text?.slice(1),
    }

    if (updatedElement.items?.length) {
      updatedElement.items = updatedElement.items.flatMap((item: any) =>
        keysList.includes(item.text.replace(/s$/, ''))
          ? item.items?.map((subItem: any) => ({
            ...subItem,
            type: item.text,
          }))
          : item,
      )
    }

    return updatedElement
  })
}
