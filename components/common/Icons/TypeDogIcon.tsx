import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const TypeDogIcon: React.FC<IconProps> = ({
  strokeColor = getToken("$textSecondary", "color"),
}) => {
  return (
    <Svg width={60} height={60} viewBox="0 0 60 60" fill="none">
      <Path
        d="M33.24 17.52c.353.165.353.165.6.48.182.982-.189 1.806-.585 2.685l-.181.414a46 46 0 0 1-2.862 5.475q-.336.546-.64 1.109a9.3 9.3 0 0 1-.847 1.267l-.154.197a65 65 0 0 1-1.81 2.173l-.212.252c-.658.777-1.393 1.483-2.117 2.198q-.259.257-.512.518c-1.296 1.26-3.094 2.152-4.635 3.081-.83.5-1.624 1.004-2.365 1.631l-.239.179c-1.72 1.349-2.8 4.024-3.091 6.139-.086.82-.132 1.646-.171 2.47l-.024.426-.018.383c-.066.42-.2.719-.417 1.083-.274.137-.46.152-.765.165l-.28.018c-.275-.063-.275-.063-.548-.315-.251-.422-.248-.67-.237-1.158-.034-.81-.223-1.14-.794-1.694-1.122-1.123-1.586-2.782-1.606-4.328.004-2.447 1.012-5.552 2.7-7.38l.33-.308.578-.578.502-.502c-2.614 1.257-4.134 2.723-5.201 5.453-.979 2.795-.45 5.724.761 8.347a18.4 18.4 0 0 0 1.526 2.405c.154.235.154.235.154.475l.21.09c.313.174.506.375.75.638.417.435.837.753 1.343 1.08.781.562.999 1.172 1.264 2.06.324.955.916 1.603 1.801 2.062 2.313 1.021 4.954.807 7.427.802h.92l2.161-.003 2.464-.003q2.53-.001 5.06-.006v-.24c-.607-.237-1.165-.29-1.807-.337-1.733-.161-3.2-.748-4.395-2.056-.223-.518-.285-.903-.158-1.447.18-.395.373-.775.575-1.158.898-1.72 1.622-4.112 1.074-6.041l-.089-.241-.077-.233c-.576-1.4-1.968-2.405-3.163-3.247-.199-.199-.14-.433-.142-.705l-.005-.322c.027-.293.027-.293.267-.653.602-.131 1.2-.113 1.76.15.312.214.595.443.88.69l.316.254c.712.597 1.181 1.203 1.604 2.026l.168.313c1.203 2.3.854 4.858.112 7.247-.207.642-.43 1.275-.692 1.897-.083.323-.034.544.052.863.769.296 1.511.398 2.325.465.932.081 1.79.22 2.595.735l.12.36.225.097c.374.21.455.474.615.863.199.815.25 1.692-.045 2.483-.195.277-.195.277-.435.397q-.342.017-.686.017l-.443.002-1.001.002q-.698.003-1.397.003l-.874.001-2.74.004q-1.575 0-3.152.006-1.221.004-2.441.004-.728 0-1.456.003-.687.003-1.374 0-.367 0-.735.004c-2.324-.01-4.404-.587-6.145-2.19-.678-.716-1.149-1.62-1.432-2.562-.131-.354-.196-.443-.514-.626-.413-.267-.693-.567-1.002-.946-.293-.353-.625-.666-.957-.982-2.367-2.3-3.718-5.458-3.807-8.74a73 73 0 0 1-.001-.897l.002-.478c.04-3.153.98-5.643 3.218-7.892 2.214-2.156 5.147-3.437 8.24-3.466l.282-.003c.741.011 1.307.173 1.9.641.232.303.297.474.315.855-.065.351-.065.351-.24.72a6 6 0 0 1-.87.457 64 64 0 0 0-.79.374c-1.178.587-2.198 1.376-3.14 2.289l-.222.196c-1.606 1.462-2.594 3.805-2.816 5.927-.038.944.2 1.755.518 2.637l.098-.4c.343-1.351.83-2.56 1.462-3.8h.24l.094-.261c.989-2.285 3.22-3.9 5.396-4.929 2.11-1.033 3.901-2.627 5.558-4.268l.264-.26a8.2 8.2 0 0 0 1.168-1.442q.19-.259.38-.514l.211-.281.22-.292a25 25 0 0 0 1.655-2.492l.174-.261h.24l.102-.265c.129-.313.273-.605.434-.903l.171-.322.354-.658c.376-.71.696-1.42.98-2.172q.293-.773.592-1.545l.151-.405.152-.39.134-.35c.379-.69.84-.9 1.61-.79"
        fill={strokeColor}
      />
      <Path
        d="m40.208 1.77.423-.007c2.176-.01 3.965.73 5.532 2.235.687.716 1.27 1.434 1.56 2.392.197.541.443.72.952.983.754.324 1.515.582 2.322.735.944.19 1.53.519 2.163 1.252.415.675.543 1.25.48 2.04-.32 1.313-1.125 2.623-2.28 3.36q-.47.266-.953.51l-.243.124c-1.045.512-2.064.62-3.215.7-.625.054-1.24.116-1.709.586.047.8.283 1.471.578 2.212l.124.324q.35.892.744 1.765c1.242 2.828 2.133 5.924 2.274 9.019l.02.35c.094 3.244-.98 6.572-3.14 9.01q-.294.248-.6.48c-1.745 1.66-2.197 4.078-2.292 6.414q-.009.45-.008.899l-.002.334v1.424c0 1.828.057 3.632.262 5.449l.24.02c1.218.106 2.21.454 3.12 1.3.454.616.5 1.158.51 1.913l.01.438c-.043.44-.135.66-.4 1.009-.326.163-.587.139-.952.143l-.453.006a403 403 0 0 1-2.05.013q-.541.003-1.083.01-.654.009-1.308.01-.249 0-.498.005a37 37 0 0 1-.698.003l-.4.003c-.473-.096-.65-.312-.958-.673l-.182-.205c-2.18-2.805-2.62-6.076-2.698-9.515l-.18.233c-.506.644-1.014 1.257-1.62 1.807l-.224.212c-.536.46-.96.617-1.67.57-.266-.062-.266-.062-.581-.317-.194-.405-.239-.621-.165-1.065a4.2 4.2 0 0 1 1.035-1.028c1.844-1.454 3.062-3.618 3.803-5.814.144-.419.303-.83.465-1.243l.17-.445c.167-.35.167-.35.527-.59.501-.08.937-.077 1.387.165.492.897.086 1.95-.179 2.87-.37 1.482-.41 3.005-.406 4.524q0 .451-.005.902c-.007 1.683.188 3.27.8 4.851l.11.291c.238.613.511 1.161.913 1.686.14.191.14.191.26.551h4.92c-.84-.315-1.46-.439-2.33-.525-.458-.08-.765-.173-1.15-.435-1.012-1.956-.639-5.24-.645-7.373l-.003-.4c-.017-3.177.077-6.9 2.328-9.387q.36-.338.727-.668c2.002-1.8 2.819-4.488 2.993-7.132.073-2.45-.577-4.903-1.362-7.203-.107-.324-.196-.651-.288-.98-.273-.901-.653-1.761-1.026-2.626-.995-2.327-.995-2.327-.976-3.456v-.442c.073-.583.238-.972.672-1.374l.295-.202.29-.203c.846-.461 1.668-.604 2.62-.666 1.28-.107 2.587-.323 3.476-1.342.738-.903.738-.903.859-2.026-.348-.232-.52-.29-.918-.365-1.601-.32-2.99-.678-4.242-1.795-.142-.237-.142-.237-.24-.487l-.117-.285-.123-.308c-.48-1.144-.872-1.966-2.04-2.52l-.307-.154c-2.192-1.019-4.398-.696-6.615.072A5.1 5.1 0 0 0 34.92 5.76l-.175.157c-.851.775-1.56 1.578-2.105 2.603l-.157.29c-.4.847-.37 1.669-.323 2.59l.255.111c1.303.629 1.919 1.618 2.516 2.901.091.224.091.224.229.348.858.092 1.572.036 2.28-.48.684-.638.934-1.406.98-2.336a62 62 0 0 0-.045-1.843l-.01-.455-.014-.411c.06-.437.185-.568.529-.835.355-.127.548-.132.915-.045.364.211.474.38.645.765.325 1.716.327 3.662-.36 5.28l-.12.36h-.24l-.034.274c-.149.565-.585.836-1.046 1.166-.928.541-1.668.745-2.73.758l-.281.01c-.831.01-1.43-.223-2.063-.76a8.2 8.2 0 0 1-1.091-1.598c-.359-.65-.684-.89-1.359-1.171-.4-.172-.62-.367-.876-.719-.53-1.63-.405-3.654.301-5.196.723-1.408 1.564-2.368 2.819-3.324l.32-.252c1.96-1.498 4.085-2.167 6.528-2.178"
        fill={strokeColor}
      />
    </Svg>
  );
};
