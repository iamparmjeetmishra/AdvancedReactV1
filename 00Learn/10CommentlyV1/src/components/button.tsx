




type btnTypes = {
   style: React.CSSProperties,
   children: React.ReactNode,
   setCount: React.Dispatch<React.SetStateAction<number>>,
}



// type btnTypes = {
//    style: {
//       bgColor: string;
//       fontSize: number;
//    }
// }

export default function Button({children,style}: btnTypes) {

	return (
      <button
         style={style} >
			{children}
		</button>
	);
}



//V1

// type Color = "bg-red-500" | "bg-orange-500" | "bg-black"

// type btnTypes = {
//    bgColor: Color ;
// }

// export default function Button({bgColor}: btnTypes) {

// 	return (
//       <button
//          className={`bg-blue-500 p-2 text-white rounded ${bgColor} `} >
// 			button
// 		</button>
// 	);
// }
