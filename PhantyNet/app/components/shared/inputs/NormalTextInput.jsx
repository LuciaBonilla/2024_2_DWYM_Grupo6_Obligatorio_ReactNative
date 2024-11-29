import { Text, View, TextInput } from "react-native";

/**
 * Input normal de texto reutilizable.
 * @param {*} viewStyle - Estilo personalizado para la vista que contiene el input.
 * @param {*} inputTitleStyle - Estilo personalizado para el título del input.
 * @param {*} inputTitle - Texto que se muestra como título o etiqueta del input.
 * @param {*} icon - Ícono opcional que se muestra junto al input.
 * @param {*} numberOfLines - Número de líneas permitidas para el texto del input (por defecto, 1).
 * @param {*} inputName - Nombre identificador del input.
 * @param {*} textInputStyle - Estilo personalizado para el input de texto.
 * @param {*} placeholder - Texto que se muestra como placeholder dentro del input.
 * @param {*} setState - Función para actualizar el estado asociado al valor del input.
 * @param {*} value - Valor actual del input.
 * @param {*} keyboardType - Tipo de teclado que se muestra (por defecto, "default").
 * @param {*} secureTextEntry - Indica si el texto ingresado debe ser seguro (oculto), como para contraseñas (por defecto, `false`).
 * @estado TERMINADO.
 */
export default function NormalTextInput({
    viewStyle,
    inputTitleStyle,
    inputTitle,
    icon,
    numberOfLines = 1,
    inputName,
    textInputStyle,
    placeholder,
    setState,
    value,
    keyboardType = "default",
    multiline = false,
    secureTextEntry = false,
}) {
    return (
        <View style={viewStyle}>
            <Text adjustsFontSizeToFit={true} style={inputTitleStyle}>{inputTitle}</Text>
            {icon}
            <TextInput
                key={inputName}
                style={textInputStyle}
                placeholder={placeholder}
                onChangeText={setState}
                value={value}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
        </View>
    );
}