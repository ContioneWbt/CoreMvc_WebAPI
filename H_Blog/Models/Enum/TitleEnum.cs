using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace H_Blog.Models.Enum
{
    public enum TitleEnum
    {
        [Description("推荐")]
        Recommend =0,
        [Description("热门")]
        Popular =1,
        [Description("置顶")]
        Top =2,
        [Description("")]
        None = 101
    }

    #region EnumExtension
    public static class EnumExtension
    {
        public static Dictionary<TitleEnum, string> _titleEnumMaping => new Dictionary<TitleEnum, string>()
        {
            { TitleEnum.Recommend, "layui-badge layui-bg-green" },
            { TitleEnum.Popular, "layui-badge" },
            { TitleEnum.Top, "layui-badge layui-bg-orange" },
            { TitleEnum.None, "" },
        };

        //TitleEnumStyle
        public static string TitleEnumStyle(this TitleEnum @enum)=> 
            $"<span class='{_titleEnumMaping[@enum]}'>{@enum.GetDescription()}</span>";

        //获取枚举描述
        public static string GetDescription(this TitleEnum @enum)
        {
            FieldInfo field = @enum.GetType().GetField(@enum.ToString());
            DescriptionAttribute attribute = Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute)) as DescriptionAttribute;
            return attribute == null ? @enum.ToString() : attribute.Description;
        }

        //int 枚举
        public static TitleEnum ConvertTitleEnum(this int @enum) => (TitleEnum)@enum;

        //枚举int
        public static int ConvertTitleEnum(this TitleEnum @enum) => (int)@enum;

    }
    #endregion
}
