import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import { IconProps } from ".";

export const NursingIcon: React.FC<IconProps> = ({
  strokeColor = "#0081E8",
  fillColor = "#C7DDFF",
}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 80 81" fill="none">
      <Path
        opacity={0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.126 10.42c5.514-2.174 11.69.268 17.438 1.754 5.202 1.345 10.555 2.797 14.28 6.446 3.6 3.529 4.36 8.59 5.846 13.275 1.528 4.816 3.333 9.49 2.965 14.511-.444 6.063-.71 12.855-5.285 17.182-4.644 4.391-11.973 4.65-18.517 5.326-6.459.668-13.665 1.974-19.018-1.445-5.268-3.364-4.78-10.736-8.068-15.854-3.253-5.06-10.945-8.003-11.067-13.922-.122-5.895 6.742-9.572 10.483-14.333 3.554-4.524 5.42-10.764 10.943-12.94"
        fill={fillColor}
      />
      <Path
        opacity={0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.126 10.916c5.514-2.173 11.69.269 17.438 1.755 5.202 1.345 10.555 2.796 14.28 6.446 3.6 3.529 4.36 8.59 5.846 13.275 1.528 4.816 3.333 9.49 2.965 14.511-.444 6.063-.71 12.855-5.285 17.182-4.644 4.39-11.973 4.65-18.517 5.326-6.459.668-13.665 1.974-19.018-1.445-5.268-3.364-4.78-10.736-8.068-15.854C15.514 47.052 7.822 44.109 7.7 38.19c-.122-5.895 6.742-9.572 10.483-14.334 3.554-4.523 5.42-10.763 10.943-12.94"
        fill={fillColor}
      />
      <G clipPath="url(#a)">
        <Path
          d="M67.48 13.267q.275.235.547.477l.222.187c1.454 1.313 2.304 3.243 2.443 5.167.082 2.55-.162 4.862-1.897 6.878-1.867 1.879-4.085 2.932-6.746 2.965-1.284-.001-2.339-.22-3.55-.625-.324-.056-.324-.056-.585.162l-.28.283-.32.319-.34.35-.353.353q-.464.465-.923.934-.47.478-.944.952-.926.933-1.847 1.871c.195.411.414.678.74.999q.15.145.302.297l.315.307 2.05 2.008.275.265.28.265c.455.52.527 1.01.507 1.679-.102.92-.862 1.517-1.544 2.066l-.285.224-.323.32c-.392.39-.598.416-1.14.425l-.335.01c-.46-.05-.785-.202-1.202-.398l-.968.954-.273.27a27 27 0 0 0-1.453 1.545c-.249.284-.51.551-.779.816l-.28.28c-.257.243-.517.474-.785.704-.511.442-.992.91-1.47 1.387l-.243.24c-.473.47-.921.955-1.359 1.459-.25.284-.514.553-.783.82l-.28.28c-.256.241-.514.471-.781.7a29 29 0 0 0-1.534 1.45l-.26.257c-.488.486-.953.984-1.404 1.504-.25.283-.512.551-.78.817l-.282.28c-.255.242-.513.472-.78.7a29 29 0 0 0-1.534 1.45l-.26.258c-.487.484-.954.98-1.402 1.5-.645.735-1.227 1.37-2.23 1.53-1.779.108-1.779.108-2.52-.358a11 11 0 0 1-.84-.835c-.369.16-.59.335-.855.633-.592.604-1.271.984-2.115 1.096-.726-.111-1.203-.468-1.725-.962-.34-.32-.632-.583-1.065-.767l-.203.205c-.443.446-.886.885-1.365 1.293a17 17 0 0 0-1.815 1.804 31 31 0 0 1-1.53 1.595l-.276.276c-.506.502-1.024.983-1.565 1.447q-.359.31-.694.647l-.214.212c-.219.23-.427.466-.635.706a33 33 0 0 1-1.633 1.698l-.31.308-.296.295-.268.265c-.38.353-.623.493-1.136.496l-.282.006c-.325-.055-.425-.138-.618-.401-.121-.376-.098-.693 0-1.073.246-.382.554-.686.881-1q.35-.341.69-.69c.746-.752 1.492-1.491 2.296-2.181.264-.228.513-.467.76-.713l.248-.246q.345-.363.67-.742a31 31 0 0 1 1.527-1.591l.276-.276c.505-.501 1.021-.98 1.562-1.443.862-.746 1.888-1.639 2.37-2.686l-.19-.18c-1.461-1.414-1.461-1.414-1.512-2.507.07-.935.733-1.536 1.362-2.179.258-.251.258-.251.22-.62-.197-.245-.414-.463-.633-.688-.599-.769-.513-1.728-.447-2.65.145-.81.636-1.334 1.2-1.909l.207-.216c.345-.35.7-.68 1.075-.999a30 30 0 0 0 1.545-1.46l.26-.258c.488-.486.953-.984 1.404-1.504.25-.283.513-.552.781-.818l.281-.28c.255-.241.514-.471.78-.7a29 29 0 0 0 1.534-1.45l.26-.257c.49-.487.956-.986 1.408-1.507.23-.262.47-.51.717-.755l.247-.246c.244-.23.492-.449.747-.667.558-.482 1.08-.996 1.601-1.517l.278-.274c.504-.502.986-1.015 1.452-1.552.599-.683 1.268-1.293 1.96-1.881.55-.492 1.064-1.023 1.583-1.547l-.177-.376c-.254-.59-.27-1.137-.183-1.77.27-.546.608-.823 1.08-1.193q.322-.357.63-.727c.377-.408.727-.673 1.296-.729l.271-.005.269-.01c.699.094 1.148.488 1.621.979l.593.61.6.597.557.554.306.304 1.417 1.408c.336-.152.577-.307.833-.57l.189-.192.193-.2c.79-.81.79-.81 1.282-.864.481.047.657.163.983.514.148.425.154.63-.014 1.05-.27.454-.587.78-.969 1.142l-.203.197-.494.473c.21.45.457.748.84 1.074.466.047.466.047.72-.18l.255-.255.29-.287.311-.314.321-.319.67-.67q.428-.431.86-.86l.82-.819.313-.312.287-.29.254-.255c.204-.194.204-.194.179-.448-.184-.18-.184-.18-.413-.358-.415-.333-.415-.333-.547-.596-.387.168-.634.375-.93.67-.339.301-.561.466-1.02.485-.45-.082-.45-.082-.743-.276-.236-.356-.307-.57-.307-.998.311-.634.827-1.056 1.352-1.521.239-.249.239-.249.194-.548l-.106-.316c-.727-2.386-.818-4.909.353-7.173.792-1.437 1.802-2.731 3.247-3.56l.331-.196c2.959-1.616 7.158-1.254 9.801.792M56.986 15.77l-.213.196c-.174.155-.174.155-.147.4h-.24c-1.052 1.865-1.424 3.859-.84 5.963.75 1.909 2.08 3.33 3.975 4.167a5.1 5.1 0 0 0 1.785.365l.305.014c1.826.047 3.485-.336 4.848-1.597 1.34-1.318 2.288-3.073 2.317-4.976-.019-1.623-.5-3.254-1.635-4.462-1.479-1.43-3.065-2.316-5.16-2.373-2.01.042-3.59.912-4.995 2.303M42.672 27.123l-.333.335-.334.336-.258.26c.583.7 1.212 1.34 1.859 1.981l.34.339.92.912.963.956 3.894 3.865 4.264 4.23.627-.525c.266-.238.481-.5.693-.786a468 468 0 0 0-1.632-1.64l-.595-.596-.187-.19q-.228-.224-.466-.436h-.24l-.096-.218c-.151-.272-.283-.398-.527-.587a6 6 0 0 1-.819-.802c-.589-.679-1.233-1.303-1.873-1.934a646 646 0 0 1-1.692-1.674 9 9 0 0 0-.678-.606 6.7 6.7 0 0 1-.812-.81 31 31 0 0 0-1.588-1.657l-.298-.298-.283-.28-.256-.254c-.306-.281-.272-.226-.593.079m-1.653 4.45-.334.301-.258.235c.118.263.215.455.428.653.323.342.302.805.292 1.255-.113.306-.113.306-.36.477-.512.086-.787.102-1.236-.16a14 14 0 0 1-.684-.555l-1.2 1.192.315.366.197.231q.201.231.416.45c.355.371.5.548.58 1.07-.068.388-.068.388-.196.611-.366.211-.65.247-1.072.254-.672-.327-1.168-.9-1.68-1.431-.386.164-.606.348-.87.67l-.19.229-.14.174c.436.946 1.297 1.657 2.035 2.373.324.332.36.43.395.899-.03.425-.03.425-.177.625-.266.197-.447.216-.776.24l-.294.023-.223.014v-.239c-.166-.166-.166-.166-.39-.343-.712-.598-1.357-1.263-2.01-1.923-.415.177-.678.41-.99.73l-.257.263-.193.2.153.157c.409.442.7.763.687 1.393-.12.336-.12.336-.36.596-.465.137-.723.17-1.17-.022a2.8 2.8 0 0 1-.63-.693c-.404.134-.525.262-.803.574l-.226.248c-.216.267-.216.267-.171.728.2.253.2.253.465.485.712.66.712.66.767 1.058l-.002.246.002.246c-.032.231-.032.231-.272.589-.421.142-.776.122-1.2 0-.498-.392-.909-.833-1.32-1.312-.386.168-.639.37-.93.67l-.224.23-.166.173a2.8 2.8 0 0 0 .495.76c.275.384.294.568.225 1.03-.113.282-.113.282-.36.476-.383.088-.703.107-1.08 0a9 9 0 0 1-.84-.715q-.512.49-1.02.986-.256.25-.517.499l-.327.32-.302.293c-.253.31-.327.49-.354.883.212.535.63.852 1.064 1.211.531.457 1.003.97 1.481 1.48a114 114 0 0 0 3.236 3.294q.275.273.548.548c.257.251.522.486.796.72.445.387.83.796 1.202 1.254.218.225.375.338.673.437.557-.042.794-.257 1.176-.65l.325-.329.336-.348c.662-.676 1.318-1.341 2.04-1.954.276-.241.516-.506.758-.78a53 53 0 0 1 2.107-2.177l.172-.172a33 33 0 0 1 1.876-1.752c.317-.28.594-.586.877-.901.483-.533.977-1.049 1.493-1.55-.169-.379-.367-.632-.662-.922l-.261-.258-.282-.275-.288-.285-.915-.899-1.486-1.462-.26-.256-.23-.225c-.279-.298-.296-.417-.311-.837.015-.425.015-.425.135-.783q.25-.044.502-.082l.283-.046c.53.016.821.293 1.184.657q.16.178.318.358a57 57 0 0 0 2.085 2.162l.314.314.3.297.268.266c.277.259.566.493.866.725l.931-.838c.358-.326.692-.658 1.007-1.025.552-.638 1.154-1.228 1.754-1.822l.598-.595c.613-.61 1.227-1.21 1.89-1.767a8 8 0 0 0 .42-.392c-.033-.494-.195-.73-.543-1.071l-.27-.269-.295-.285-.302-.298-.96-.94q-.322-.315-.642-.631-.59-.582-1.184-1.16a144 144 0 0 1-1.287-1.273l-.466-.465-1.062-1.06-1.373-1.368-.254-.255-.235-.233-.207-.207c-.36-.326-.595.126-.888.392M23.221 54.67l-.33.335-.33.335-.254.261c.492.605 1.023 1.116 1.61 1.631.74.662 1.423 1.364 2.049 2.134.182.212.182.212.54.17.257-.237.257-.237.503-.536l.26-.302.198-.235c-.43-.942-1.304-1.718-2.093-2.37a8 8 0 0 1-.986-1.015 6 6 0 0 0-.641-.67c-.276-.026-.276-.026-.526.262"
          fill={strokeColor}
        />
        <Path
          d="M60.467 54.648v.239h.24c.646.694 1.045 1.58 1.47 2.415a13.4 13.4 0 0 0 1.715 2.59c.804.985 1.248 1.83 1.135 3.104-.145.69-.39 1.342-.96 1.79-1.144.662-2.166 1.067-3.49.744-.537-.171-1.033-.346-1.505-.656-.564-.29-.984-.337-1.605-.208-.45.192-.868.404-1.297.64-.854.433-1.775.416-2.686.165-.895-.296-1.559-.777-2.015-1.618-.356-.82-.367-1.657-.085-2.504.268-.605.685-1.064 1.12-1.553.898-1.02 1.508-2.198 2.098-3.41.512-1.048 1.06-1.826 2.145-2.334 1.303-.426 2.617-.134 3.72.596m-3.665 1.9a14 14 0 0 0-.535.962l-.11.21c-.458.87-.458.87-.85 1.77-.336.798-.934 1.487-1.56 2.075-.307.316-.357.45-.413.895.016.422.016.422.278.7.506.385.954.372 1.575.313.374-.14.374-.14.72-.358q.246-.128.495-.253l.233-.12c.892-.398 1.945-.33 2.85-.014.377.15.715.318 1.057.537.514.265.916.313 1.485.208.512-.265.512-.265.84-.715.063-.483.022-.68-.242-1.1a19 19 0 0 0-.32-.39l-.16-.197a17 17 0 0 0-.777-.9c-.436-.518-.683-1.148-.961-1.759-.561-1.401-.561-1.401-1.62-2.385-.76-.141-1.472-.12-1.985.522"
          fill={strokeColor}
        />
        <Path
          d="M64.99 16.263c.233.18.233.18.397.343v.239l.22.092c.614.345.96 1.18 1.159 1.83.284 1.604.119 3.068-.828 4.414-.523.704-1.042 1.211-1.871 1.534l-.236.114c-1.108.466-2.563.424-3.672-.01-1.48-.715-2.344-1.682-2.932-3.204-.4-1.2-.172-2.705.36-3.816.544-1.04 1.709-1.827 2.782-2.274 1.571-.421 3.298-.194 4.62.738m-5.003 1.893c-.565.746-.904 1.44-.84 2.386.17.976.677 1.61 1.462 2.19.656.33 1.387.405 2.1.239.779-.282 1.464-.665 1.876-1.4.369-.842.436-1.485.12-2.356-.377-.862-1.013-1.35-1.838-1.774-1.042-.317-2.12-.06-2.88.715m7.268 32.162c.745.45 1.335 1.119 1.613 1.945.093.91.003 1.714-.48 2.505-.564.645-1.24 1.133-2.112 1.225-1.051.036-1.847-.182-2.624-.901-.639-.71-.815-1.534-.784-2.471.145-.94.672-1.61 1.409-2.193.844-.513 2.09-.52 2.978-.11M65.29 52.27c-.307.335-.307.335-.255.782.093.414.093.414.353.76.336.115.524.146.862.03.253-.153.253-.153.458-.507.07-.347.07-.347 0-.715-.255-.353-.255-.353-.6-.596-.486-.047-.486-.047-.818.246"
          fill={strokeColor}
        />
        <Path
          d="M51.752 50.288c.713.434 1.365 1.091 1.582 1.908.142 1.005 0 1.803-.561 2.659-.55.659-1.229 1.043-2.08 1.138-.969.036-1.714-.177-2.449-.825-.695-.754-.937-1.524-.906-2.54.11-.83.466-1.458 1.129-1.975.933-.643 2.22-.825 3.285-.365m-1.935 1.99c-.296.32-.296.32-.338.708.083.43.199.568.548.828.3.13.422.137.735.037.278-.194.365-.31.465-.634-.018-.431-.073-.654-.338-.998-.428-.317-.664-.254-1.072.06"
          fill={strokeColor}
        />
        <Path
          d="M60.227 46.897c.66.842.946 1.67.84 2.743-.157.724-.413 1.27-.96 1.788-.92.559-1.845.768-2.915.538-.752-.256-1.313-.67-1.683-1.38-.357-.755-.46-1.521-.236-2.334.364-.977.903-1.497 1.834-1.952 1.047-.307 2.285-.113 3.12.597m-3 1.908c-.082.44-.06.625.187.999.408.27.653.27 1.133.193.321-.23.321-.23.48-.596 0-.459-.017-.72-.33-1.066-.682-.32-1.028-.108-1.47.47"
          fill={strokeColor}
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M10.667 11.597h60v59.627h-60z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
