import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import { IconProps } from ".";
import { getToken } from "tamagui";

export const TypeGuineaPigIcon: React.FC<IconProps> = ({
  strokeColor = getToken("$textSecondary", "color"),
}) => {
  return (
    <Svg width={60} height={60} viewBox="0 0 60 60" fill="none">
      <G clipPath="url(#a)" fill={strokeColor}>
        <Path d="m16.529 1.967.332.001c1.915.031 3.47.743 4.825 2.102.428.464.743.923 1.046 1.475l.162-.08c1.141-.563 2.262-1.08 3.49-1.424l.353-.104c2.643-.657 5.469-.262 7.92.856l.225.103q.695.318 1.385.649l.135-.228c1.02-1.676 2.39-2.663 4.27-3.21 1.397-.318 3.098-.268 4.404.323l.349.154c1.76.863 2.962 2.298 3.626 4.143a7.5 7.5 0 0 1-.603 5.638c-.743 1.287-1.793 2.1-3.05 2.848l.159.25c4 6.431 6.34 14.086 6.327 21.664v.35c-.004 1.779-.08 3.494-.47 5.236L51.35 43a21 21 0 0 1-.474 1.754l-.068.216c-.921 2.856-2.708 5.774-5.196 7.518l.108.37c.206.944.352 2.278-.188 3.121-.499.597-1.118.96-1.892 1.051a17 17 0 0 1-.834.013h-.95q-.488-.003-.975.001l-.627-.001-.291.002c-.744-.008-1.359-.113-1.935-.606-.248-.222-.248-.222-.58-.194l-.36.071-.406.075-.422.085c-2.244.434-4.43.565-6.714.558h-.389c-2.088-.005-4.105-.096-6.16-.488l-.348-.066q-.323-.061-.644-.133c-.557-.13-.557-.13-1.06.085l-.255.246c-.666.306-1.22.37-1.947.365h-.949q-.488-.003-.976.001l-.626-.001-.292.002c-.763-.009-1.468-.146-2.065-.663l-.176-.146c-.468-.572-.54-1.143-.522-1.854l.003-.242a6.2 6.2 0 0 1 .245-1.652l-.216-.166c-1.901-1.5-3.319-3.425-4.295-5.634l-.09-.203a19.9 19.9 0 0 1-1.65-7.82l-.003-.327c-.024-4.474-.024-4.474.346-6.582l.067-.391c.975-5.643 2.889-11.338 6.056-16.152l-.241-.145c-1.73-1.047-3.033-2.491-3.534-4.495-.29-1.408-.256-3.07.338-4.383l.154-.35c.87-1.773 2.298-2.938 4.143-3.625.697-.215 1.34-.253 2.068-.248m-3.83 3.585c-1.058 1.285-1.296 2.67-1.139 4.29.25 1.324 1.082 2.518 2.182 3.29a8 8 0 0 0 1.682.797c.218.102.218.102.433.425.13.77-.258 1.252-.664 1.866-.54.83-.54.83-1.053 1.676q-.068.113-.135.23c-.114.22-.114.22.026.524.295.096.571.167.873.229l.266.055c3.257.649 6.366-.1 9.11-1.911.509-.363.989-.755 1.46-1.165l.2-.173c1.535-1.426 2.575-3.418 3.13-5.413l.104-.358c.282-1.141.645-3.3.111-4.369-2.336-.148-4.655.991-6.553 2.256-.66.072-.66.072-.97-.173-.25-.303-.383-.602-.54-.962-.603-1.274-1.573-2.118-2.894-2.625-2.067-.703-4.152-.05-5.63 1.51m26.47-.651-.24.192c-.706.631-1.084 1.388-1.495 2.225-.199.375-.199.375-.414.483-.628.062-.99-.094-1.497-.437-1.357-.86-2.736-1.376-4.303-1.712l-.004.262c-.06 4.217-.98 7.781-3.971 10.91l-.198.22c-.64.68-1.392 1.198-2.165 1.714l-.305.205c-2.888 1.814-6.614 2.33-9.931 1.643a26 26 0 0 1-1.157-.295c-.225-.061-.225-.061-.531-.05-1.795 3.725-2.967 7.64-3.653 11.71l-.058.328c-.278 1.61-.297 3.219-.304 4.848l-.003.314c-.012 1.935.137 3.868.647 5.742l.082.305c.854 3.037 2.52 5.527 4.9 7.584.223-.109.44-.22.654-.346 1.042-.583 2.172-.74 3.34-.494 1.234.36 2.131 1.073 2.754 2.192.244.497.342.973.4 1.518l.028.261.021.199q1.07.237 2.149.43l.286.052c3.462.592 7.43.576 10.886-.052l.318-.058a51 51 0 0 0 1.83-.372l.028-.268c.155-1.228.541-2.22 1.476-3.062 1.074-.779 2.23-1.079 3.545-.9.638.12 1.158.368 1.719.685l.43.215c2.566-2.284 4.803-5.377 5.156-8.916l-.356.051c-2.278.282-4.499.035-6.379-1.368-1.665-1.34-2.666-3.141-2.984-5.248-.167-1.555.164-2.889.803-4.285l.09-.2q.21-.454.425-.905c.422-.952.383-2.175.015-3.138a30 30 0 0 0-.316-.698q-.15-.334-.296-.667l-.196-.436c-.779-1.724-.723-3.699-.07-5.458.64-1.51 1.542-2.737 2.926-3.644l.322-.215a4 4 0 0 0-.43-.86c-.032-.207-.032-.207-.033-.43l-.006-.22c.053-.282.133-.36.362-.531q.325-.13.658-.242c1.362-.508 2.364-1.508 2.993-2.814.49-1.242.528-2.71.036-3.961-.683-1.377-1.753-2.425-3.204-2.96-1.672-.44-3.432-.132-4.78.954m4.082 13.535c-1.317 1.476-1.725 2.979-1.635 4.906.057.6.302 1.11.56 1.646q.15.333.297.667.096.22.197.437c.643 1.425.735 3.165.203 4.643q-.493 1.16-1.032 2.301c-.468 1.112-.312 2.674.085 3.776.245.54.547 1.02.895 1.497l.143.206c.814 1.07 2.2 1.829 3.51 2.05 1.202.13 2.326.076 3.437-.43.131-.516.128-1.024.133-1.553l.003-.303c.02-2.357-.04-4.63-.458-6.953l-.061-.344a41 41 0 0 0-.556-2.567c-.895-3.65-2.222-7.684-4.325-10.839-.587 0-.985.474-1.396.86M15.61 52.71c-.547.626-.66 1.176-.659 2l.047.25c1.053.701 3.183.362 4.4.258.251-.036.251-.036.541-.259.124-.66.037-1.279-.301-1.857-.468-.67-1.045-1.059-1.827-1.251-.864-.066-1.59.265-2.201.858m24.095-.114c-.565.655-.715 1.243-.699 2.098.03.303.03.303.377.48 1.26.288 3.034.257 4.296 0l.323-.215c.12-.64.05-1.279-.281-1.842-.554-.74-1.18-1.097-2.082-1.273-.718 0-1.4.285-1.934.752" />
        <Path d="M29.387 34.94c.305.053.492-.076.764-.204.36-.138.713-.132 1.095-.127l.242.003c1.262.038 2.193.542 3.058 1.448.922 1.094 1.09 2.25.994 3.637-.125 1.157-.794 2.05-1.663 2.78-1.095.792-2.208.889-3.518.773a3.7 3.7 0 0 1-.746-.283c-.305-.054-.492.075-.764.203-.36.138-.713.133-1.095.127l-.242-.003c-1.262-.038-2.193-.542-3.058-1.448-.922-1.093-1.09-2.25-.994-3.637.125-1.157.794-2.049 1.662-2.78 1.17-.845 2.932-1.185 4.265-.49m-3.432 2.187c-.613.777-.73 1.494-.644 2.47.188.714.693 1.202 1.289 1.612.392.192.712.247 1.148.248l.31.006.26-.04c.283-.423.246-.79.244-1.282v-.882q-.002-.458 0-.914l.001-.857c-.004-.535-.004-.535-.245-1.006-.848-.262-1.712.089-2.363.645m4.62-.537c-.354.706-.227 1.709-.23 2.484v.272c-.032 1.091-.032 1.091.337 2.078.64.12 1.276.048 1.842-.28.538-.407.96-.898 1.165-1.546.094-.788.068-1.507-.43-2.149-.578-.598-1.1-.982-1.936-1.071-.293-.004-.497.067-.749.212m-1.101-14.864.332-.008c.916-.003 1.691.196 2.48.666.67.731.734 1.454.694 2.406-.054.537-.19.925-.472 1.38l-.174.337c-.491.594-1.144 1.012-1.867 1.275.164.623.285 1.043.86 1.397.399.2.854.155 1.289.107.483-.237.748-.477.967-.967q.125-.458.231-.92c.09-.261.09-.261.413-.476.763-.073.763-.073 1.098.179.351.46.26.988.191 1.54a4 4 0 0 1-.43.966l-.114.204c-.462.735-1.205 1.186-2.034 1.408-1.17.104-2.13.035-3.068-.725l-.262-.242c-.363.16-.658.379-.97.62-.777.48-1.697.417-2.575.347a3 3 0 0 1-.967-.43l-.23-.142c-.71-.482-1.202-1.159-1.381-2.006-.101-1.156-.101-1.156.19-1.54.253-.19.36-.238.67-.233l.214-.003c.315.084.443.234.645.487.097.281.097.281.16.584.117.472.227.792.592 1.134.482.29.956.285 1.504.215.479-.235.746-.48.966-.967.077-.343.077-.343.108-.644l-.322-.067c-.827-.243-1.345-.802-1.802-1.508-.456-.871-.497-1.94-.284-2.895.254-.6.762-.944 1.334-1.224.667-.248 1.306-.254 2.014-.255m-1.585 2.189c-.084.49-.044.878.175 1.323.346.39.625.674 1.157.76.61.027.994-.049 1.461-.472.396-.447.51-.812.476-1.397-.032-.234-.032-.234-.24-.429-.846-.265-2.348-.465-3.029.215M18.316 5.732c.896.534 1.454 1.274 1.73 2.284.085.95.104 1.858-.43 2.685l-.141.23c-.503.742-1.147 1.145-2.007 1.382-.95.084-1.858.103-2.685-.43l-.23-.142c-.742-.503-1.145-1.147-1.382-2.007-.107-1.192-.037-2.227.726-3.202 1.106-1.185 2.959-1.5 4.419-.8m-3.144 2.243c-.237.492-.26.9-.174 1.437.25.52.554.824 1.074 1.074.536.086.945.063 1.437-.174.385-.349.668-.628.752-1.158.028-.61-.047-.993-.47-1.46-.468-.424-.85-.499-1.462-.471-.53.084-.808.367-1.157.752m28.925-2.243c.896.534 1.454 1.274 1.73 2.284.086.95.104 1.858-.429 2.685l-.142.23c-.502.742-1.147 1.145-2.006 1.382-.951.084-1.859.103-2.686-.43l-.23-.142c-.742-.503-1.145-1.147-1.381-2.007-.108-1.192-.038-2.227.725-3.202 1.106-1.185 2.959-1.5 4.42-.8m-3.144 2.243c-.236.492-.26.9-.174 1.437.25.52.554.824 1.074 1.074.537.086.945.063 1.437-.174.385-.349.668-.628.753-1.158.027-.61-.048-.993-.471-1.46-.468-.424-.85-.499-1.461-.471-.53.084-.81.367-1.157.752" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M2 2h55v55H2z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
